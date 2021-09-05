const fs = require('fs').promises;

async function getToken() {
  const rawToken = await fs.readFile('./token.json');
  return JSON.parse(rawToken);
}

async function saveToken(newToken) {
  console.log('saveToken called');
  const tokenJSON = { token: newToken };

  try {
    await fs.writeFile('./token.json', JSON.stringify(tokenJSON));
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getToken, saveToken };