const crypto = require('crypto');

function createToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = createToken;
