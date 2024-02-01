import { describe, expect, it } from '@jest/globals';
import { indexTemplate } from './html';

describe('html', () => {
  describe('indexTemplate', () => {
    it.skip('should have a test', () => {
      // TODO laga þetta test
      expect(indexTemplate().length).toBeGreaterThan(1);
    });
  });
});

// Returns a string containing an HTML template with a title and body.
it('should return a string containing an HTML template with a title and body', () => {
  const result = indexTemplate();
  expect(typeof result).toBe('string');
  expect(result.includes('<html>')).toBe(true);
  expect(result.includes('<title>Boltadeildin—forsíða!</title>')).toBe(true);
  expect(result.includes('<section>')).toBe(true);
  expect(result.includes('<h1>Velkomin í Boltadeildina!</h1>')).toBe(true);
  expect(result.includes('<ul>')).toBe(true);
  expect(
    result.includes('<li><a href="leikir.html">Seinustu leikir</a></li>'),
  ).toBe(true);
  expect(
    result.includes('<li><a href="stada.html">Staðan í deildinni</a></li>'),
  ).toBe(true);
});

it('should return a string containing an HTML template with default title when the title argument is null', () => {
  const result = indexTemplate();
  expect(result.includes('<title>Boltadeildin—forsíða!</title>')).toBe(true);
});


// Generates a table with a header row and rows for each game
it('should generate a table with a header row and rows for each game', () => {
  const games = [
    {
      date: '2022-01-01T00:00:00Z',
      games: [
        {
          home: { name: 'Team A', score: 1 },
          away: { name: 'Team B', score: 2 }
        },
        {
          home: { name: 'Team C', score: 3 },
          away: { name: 'Team D', score: 4 }
        }
      ]
    }
  ];
  const result = leikirTemplate(games);
  expect(result).toContain('<table>');
  expect(result).toContain('<th>Home Team Name</th>');
  expect(result).toContain('<th>Home Score</th>');
  expect(result).toContain('<th>Away Score</th>');
  expect(result).toContain('<th>Away Team Name</th>');
  expect(result).toContain('<th>Date</th>');
  expect(result).toContain('<tr><td>Team A</td><td>1</td><td>2</td><td>Team B</td><td>2022-01-01</td></tr>');
  expect(result).toContain('<tr><td>Team C</td><td>3</td><td>4</td><td>Team D</td><td>2022-01-01</td></tr>');
  expect(result).toContain('</table>');
});