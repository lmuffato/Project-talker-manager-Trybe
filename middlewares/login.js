const generateToken = require('../generateToken');
const { ok, badRequest } = require('../httpStatusCode');

const PASSWORD_LENGTH = 6;
const regexEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

const login = (req, res, _next) => {
  const { email, password } = req.body;

  if (!email) return res.status(badRequest).json({ message: 'O campo "email" é obrigatório' });
  if (!regexEmail.test(email)) {
    return res.status(badRequest).json({
      message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) {
    return res.status(badRequest).json({
      message: 'O campo "password" é obrigatório' });
  }
  if (password.length < PASSWORD_LENGTH) {
    return res.status(badRequest).json({
      message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  res.status(ok).json({ token: generateToken() });
};

module.exports = login;
