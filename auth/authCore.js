const fs = require('fs').promises;

const gen = () => Math.random().toString(36).substr(4);

const generateToken = async () => {
  const newToken = `${gen()}${gen()}`;
  const tokens = JSON.parse((await fs.readFile('./auth/validTokens.json')).toString('utf-8'));
  tokens.push(newToken);
  await fs.writeFile('./auth/validTokens.json', JSON.stringify(tokens));
  return newToken;
};

module.exports = {
    generateToken,
};