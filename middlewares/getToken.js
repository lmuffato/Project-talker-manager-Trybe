const randToken = require('rand-token');

function getToken() {
  const token = { token: randToken.uid(16) };
  return token;
}

module.exports = getToken;
