function template(title, body) {
  const html = /* html */ `
  <html>
    <head>
      <title>${title}</title>
    </head>
    <body>
      ${body}
    </body>
  </html>`;

  return html;
}

export function indexTemplate() {
  const title = 'Boltadeildin—forsíða!';
  const body = /* html */ `
  <section>
    <h1>Velkomin í Boltadeildina!</h1>
    <ul>
      <li><a href="leikir.html">Seinustu leikir</a></li>
      <li><a href="stada.html">Staðan í deildinni</a></li>
    </ul>
  </section>`;

  return template(title, body);
}

export function stadaTemplate(standings) {
  const title = 'Boltadeildin—staðan!';
  const standingsHtml = standings.toString();
  const body = /* html */ `
  <section>
    <h1>Staðan í deildinni!</h1>
    ${standingsHtml}
  </section>`;

  return template(title, body);
}

export function stodurTemplate(points) {
  // console.log(points)
  // reikna stig og birta 
  const tafla = `
  <h1> Stöðutaflan </h1>
  <div class="table">
  <table>
    <thead>
      <tr>
        <th>Sæti</th>
        <th>Lið</th>
        <th>Stig</th>
      </tr>
    </thead>
    <tbody>
      ${points.map(stadaTemplate).join('')}
    </tbody>
  </table>
</div>
<p><a href="./index.html">Til baka</a></p>
</div>
  `;
  return template('Stöðutafla', tafla)
}
export function leikirTemplate(games) {
  const title = 'Boltadeildin—leikir!';

  // Start gamesHtml with an opening table tag and header row
  let gamesHtml = '<table><tr><th>Home Team Name</th><th>Home Score</th><th>Away Score</th><th>Away Team Name</th><th>Date</th></tr>';

  // Iterate through each game and add table rows with game data
  for (let i = 0; i < games.length; i++) {
    for (let j = 0; j < games[i].games.length; j++) {
      const game = games[i].games[j];
      gamesHtml += `<tr><td>${game.home.name}</td><td>${game.home.score}</td><td>${game.away.score}</td><td>${game.away.name}</td><td>${games[i].date}</td></tr>`;
    }
  }

  // Close the table tag
  gamesHtml += '</table>';

  const body = /* html */ `
  <section>
    <h1>Leikir seinust vikna</h1>
    ${gamesHtml}
  </section>`;

  return template(title, body);
}


