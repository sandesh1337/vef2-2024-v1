function template(title, body) {
  const html = /* html */ `
  <html>
  
    <head>
    <link rel="stylesheet" href="./public/styles.css">
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
export function stadaTemplate(standing, index) {
  // standing[0] is the team name, standing[1] is the points
  // index + 1 is used for ranking, assuming the points array is pre-sorted
  return `
    <tr>
      <td>${index + 1}</td>
      <td>${standing[0]}</td>
      <td>${standing[1]}</td>
    </tr>
  `;
}
export function stodurTemplate(points) {
  // Since points is already sorted, just map through it to generate table rows
  const tableBody = points.map(stadaTemplate).join('');

  const table = `
    
    <h1>Stöðutaflan</h1>
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
          ${tableBody}
        </tbody>
      </table>
    </div>
    <p><a href="./index.html">Til baka</a></p>
  `;

  return template('Stöðutafla', table);
}



export function leikirTemplate(games) {

  const title = 'Boltadeildin—leikir!';



  // Start gamesHtml with the table structure and header row
  let gamesHtml = '<table><tr><th>Home Team Name</th><th>Home Score</th><th>Away Score</th><th>Away Team Name</th><th>Date</th></tr>';

  // Iterate through each game day and each game
  for (let i = 0; i < games.length; i++) {
    const gameDay = new Date(games[i].date);



    for (let j = 0; j < games[i].games.length; j++) {
      const game = games[i].games[j];
      gamesHtml += `<tr><td>${game.home.name}</td><td>${game.home.score}</td><td>${game.away.score}</td><td>${game.away.name}</td><td>${games[i].date.split('T')[0]}</td></tr>`;
    }

  }

  // Close the table tag
  gamesHtml += '</table>';

  const body = /* html */ `
  <section>
    <h1>Alla Leikir</h1>
    ${gamesHtml}
  </section>`;

  return template(title, body);
}





