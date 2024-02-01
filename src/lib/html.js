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

  // Initialize gamesHtml as an empty string
  let gamesHtml = '';
  //add table HTML
  // gamesHtml += `
  // Iterate through each game and concatenate its formatted string to gamesHtml
  for (let i = 0; i < games.length; i++) {
    for (let j = 0; j < games[i].games.length; j++) {
      const game = games[i].games[j];
      const gameStr = `${game.home.name} ${game.home.score} - ${game.away.score} ${game.away.name} ${games[i].date}<br>`;
      gamesHtml += gameStr;
    }
  }

  const body = /* html */ `
  <section>
    <h1>Leikir seinust vikna</h1>
    ${gamesHtml}
  </section>`;

  return template(title, body);
}

