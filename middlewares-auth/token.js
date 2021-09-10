// modulo do node proprio para tokens:
// https://www.npmjs.com/package/crypto-token
const cryptoToken = require('crypto-token');

function generateToken() {
  return cryptoToken(16);
}

module.exports = generateToken;
