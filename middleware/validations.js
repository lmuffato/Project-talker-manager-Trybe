const crypto = require('crypto');

const HTTP_OK_STATUS = 200;

const cryptoGenerate = (req, res) => {
  const cryptoToken = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ cryptoToken });
};

module.exports = {
  cryptoGenerate,
};
