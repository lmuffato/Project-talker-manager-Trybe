//  Crypto reference: https://developer.mozilla.org/pt-BR/docs/Web/API/Crypto

const crypto = require('crypto');

const generateToken = (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
};

module.exports = generateToken;
