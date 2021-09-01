const crypto = require('crypto');
// https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js

function encryptToString(numberOfBytes) {
  return crypto.randomBytes(numberOfBytes).toString('hex');
}

module.exports = {
  encryptToString,
};
