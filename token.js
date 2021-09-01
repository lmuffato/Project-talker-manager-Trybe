const crypto = require('crypto');

const createToken = () => crypto.randomBytes(8).toString('hex');

module.exports = createToken;