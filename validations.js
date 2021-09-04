const crypto = require('crypto');

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;
const SIX = 6;
const EIGHT = 8;

const validEmail = (req, res, next) => {
  const { email } = req.body;
  const emailCondicion = /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm; // => https://regexr.com

  // const emailValido = email.match(emailCondicion); // não passou no teste usando o ( '.match' ?)

  if (!email || email === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailCondicion.test(email)) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < SIX) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const tokenCrypto = (_req, res) => {
  const token = crypto.randomBytes(EIGHT).toString('hex');

  // console.log('teste do token', token);

  return res.status(HTTP_OK_STATUS).json({ token });
};

module.exports = {
  validEmail,
  validPassword,
  tokenCrypto,
};
