const { Router } = require('express');
const { OK, BAD_REQUEST } = require('../utils/status');
const generateToken = require('../utils/tokenGenerator');

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  const validEmail = emailRegex.test(String(email).toLowerCase());
  if (!email) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!validEmail) {
    return res.status(BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(BAD_REQUEST).json(
      { message: 'O campo "password" é obrigatório' },
    );
  }
  if (password.length < 6) {
    return res.status(BAD_REQUEST).json(
      { message: 'O "password" deve ter pelo menos 6 caracteres' },
    );
  }
  next();
};

const login = Router().post('/', validatePassword, validateEmail, (_req, res) => {
  res.status(OK).json({ token: generateToken() });
});

module.exports = login;
