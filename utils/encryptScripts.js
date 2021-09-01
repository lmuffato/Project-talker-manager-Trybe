const crypto = require('crypto');

function encryptToString(numberOfBytes) {
  return crypto.randomBytes(numberOfBytes).toString('hex');
}

module.exports = {
  encryptToString,
};