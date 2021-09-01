const { HTTP_BAD_REQUEST_STATUS } = require('../../util/constants');
const isEmailValid = require('./validation/email');
const isPasswordValid = require('./validation/password');

const validateEmail = async (req, res, next) => {
  const { email } = req.body || {};
    if (!email) {
      return res
        .status(HTTP_BAD_REQUEST_STATUS)
        .json({ message: 'O campo "email" é obrigatório' });
    }
    if (!isEmailValid(email)) {
      return res
        .status(HTTP_BAD_REQUEST_STATUS)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
      }
    next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body || {};
  if (!password) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (!isPasswordValid(password)) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};
module.exports = { validateEmail, validatePassword };