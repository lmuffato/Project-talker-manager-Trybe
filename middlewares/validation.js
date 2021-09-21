const crypto = require('crypto');
const { HTTP_BAD_REQUEST, HTTP_OK_STATUS } = require('../utils/statusHttp'); 

function emailValidation(email) {
  const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return regex.test(email);
}

function tokenGeneration() {
  return crypto.randomBytes(8).toString('hex');
}

const validateLogin = (req, res) => {
  const token = tokenGeneration();
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (emailValidation(email) === false) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password === undefined) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.toString().length < 6) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(HTTP_OK_STATUS).json({ token });
};

module.exports = {
  validateLogin,
};