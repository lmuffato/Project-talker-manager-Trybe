const fs = require('fs').promises;
const crypto = require('crypto');

const gen = () => crypto.randomBytes(8).toString('hex');

const generateToken = async () => {
  const newToken = gen();
  const tokens = JSON.parse((await fs.readFile('./auth/validTokens.json')));
  tokens.push(newToken);
  await fs.writeFile('./auth/validTokens.json', JSON.stringify(tokens));
  return newToken;
};

module.exports = {
    generateToken,
};