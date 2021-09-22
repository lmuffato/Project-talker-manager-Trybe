// Soluções encontradas em conjunto com Eduardo Costa - Turma 10-A
const crypto = require('crypto');

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;

const cryptoGenerate = (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token });
};

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  const validEmail = /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm; // => https://regexr.com

  if (!email || email === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmail.test(email)) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return next;
};

module.exports = {
  cryptoGenerate,
  checkEmail,
};
