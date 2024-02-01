import { writeFile } from 'fs/promises';
import { join } from 'path';
import { indexTemplate, leikirTemplate, stodurTemplate } from './lib/html.js';


import {
  createDirIfNotExists,
  readFile,
  readFilesFromDir,
} from './lib/file.js';

import {
  parseGameday,
  parseTeamsJson
} from './lib/parse.js';

const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';

let teams;
async function main() {
  await createDirIfNotExists(OUTPUT_DIR);

  const files = await readFilesFromDir(INPUT_DIR);
  const potentialGamedays = [];
  const legalGamedays = [];

  for await (const file of files) {
    let isTeams = false;
    if (file.indexOf('gameday') < 0) {
      if (file.indexOf('teams') >= 0) {
        isTeams = true;
      } else {
        continue;
      }
    }
    const fileContents = await readFile(file);

    // parse-a file contents (lesa inn gogn og setja i breytur)
    if (isTeams) {
      teams = parseTeamsJson(fileContents);
    } else {
      let gameday = parseGameday(fileContents);
      if (gameday !== null && gameday?.date !== null && gameday?.games?.length !== 0) {
        potentialGamedays.push(gameday);
      }
    }
  }



  for (let gameday of potentialGamedays) {
    let date = gameday.date;
    let legalGames = [];
    for (let game of gameday.games) {
      if (isGameLegal(game)) {
        legalGames.push(game);
        //console.log(game);

      }
    }
    legalGamedays.push({
      date: date,
      games: legalGames
    });

  }
  //console.log(legalGamedays);
  for (let gameday of legalGamedays) {
    //console.log(gameday.date)
    gameday.games.forEach((game) => {
      //console.log(game)
    })
  }

  legalGamedays.sort(function (x, y) {
    if (x.date < y.date) {
      return -1;
    }
    if (x.date > y.date) {
      return 1;
    }
    return 0;
  });

  // reikna stig fyrir hver lið
  let pointsDict = {};
  // ef legalGamedays[?].games[?].home.score !== legalGamedays[0].games[0].away.score 
  legalGamedays.forEach(gameday => {
    gameday.games.forEach(game => {
      if (!pointsDict[game.home.name]) {
        pointsDict[game.home.name] = 0
      }
      if (!pointsDict[game.away.name]) {
        pointsDict[game.away.name] = 0
      }
      if (game.home.score > game.away.score) {
        pointsDict[game.home.name] += 3
      }
      if (game.home.score < game.away.score) {
        pointsDict[game.away.name] += 3
      }
      if (game.home.score == game.away.score) {
        pointsDict[game.home.name] += 1
        pointsDict[game.away.name] += 1
      }
      //console.log(game)
    });
    //console.log(gameday)
  });


  var sortedPoints = Object.keys(pointsDict).map(function (key) {
    return [key, pointsDict[key]];
  });

  sortedPoints.sort(function (first, second) {
    return second[1] - first[1];
  });

  await writeFile(join(OUTPUT_DIR, 'index.html'), indexTemplate(), {
    flag: 'w+',
  });

  //console.log("legalGamedays", legalGamedays)
  //console.log(legalGamedays[0].games[0].home.name + " " + legalGamedays[0].games[0].home.score + " - " + legalGamedays[0].games[0].away.score + " " + legalGamedays[0].games[0].away.name + " " + legalGamedays[0].date)
  await writeFile(join(OUTPUT_DIR, 'leikir.html'), leikirTemplate(legalGamedays), {
    flag: 'w+',
  });

  await writeFile(join(OUTPUT_DIR, 'stada.html'), stodurTemplate(sortedPoints), {
    flag: 'w+',
  });
}

function isTeamLegal(team) {
  return teams.includes(team);
}

function isScoreLegal(score) {
  if (!Number.isInteger(score)) {
    return false;
  }
  if (score < 0) {
    return false;
  }
  return true;
}

function isGameLegal(game) {
  if (!isTeamLegal(game.home.name)) {
    return false;
  }
  if (!isTeamLegal(game.away.name)) {
    return false;
  }
  if (!isScoreLegal(game.home.score)) {
    return false;
  }
  if (!isScoreLegal(game.away.score)) {
    return false;
  }
  return true;
}

main().catch((error) => {
  console.error('error generating', error);
});