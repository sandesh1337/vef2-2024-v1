export function parseTeamsJson(data) {

  return JSON.parse(data);

}

/**
 * Tekur `gameday` gögn, staðfestir og hendir ólöglegum
 * færslum, skilar á normalizeseruðu formi.
 * @param {string} data Gögn lesin af disk
 * @returns {null | string[]} Gögn á flottara formi
 */
export function parseGameday(data) {
  let parsed;
  try {
    parsed = JSON.parse(data);
  } catch (e) {
    console.error('Invalid JSON data', e);
    return null;
  }

  if (typeof parsed !== 'object' || parsed === null) {
    console.warn('Parsed data is not an object');
    return null;
  }

  if (!Array.isArray(parsed.games) || parsed.games.length === 0) {
    console.warn('Missing or empty games array');
    return null;
  }

  const isValidGames = parsed.games.every(game => {
    return typeof game === 'object' && game !== null;
    // Add more checks as necessary for game object structure
  });

  if (!isValidGames) {
    console.warn('Invalid game objects in games array');
    return null;
  }

  // Validate 'date' string in ISO 8601 format
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(parsed.date)) {
    console.warn('Invalid or missing date string in ISO 8601 format');
    return null;
  }

  // Data is valid, return the parsed object
  return parsed;
}

