const crypto = require('crypto');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createToken() {
  return crypto.randomBytes(8).toString('hex');
}
// https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.match(emailPattern)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const checkPassword = (req, res) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token: createToken() });
};

module.exports = {
  checkEmail,
  checkPassword,
};
