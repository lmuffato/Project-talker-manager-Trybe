const express = require('express');
const crypto = require('crypto');

const auth = express.Router();

const createToken = () => crypto.randomBytes(8).toString('hex');

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /[a-z0-9]+@[a-z0-9]+(\.com)$/gi;

  const isEmailValid = regexEmail.test(email);

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!isEmailValid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const checkPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

auth.post('', checkEmail, checkPassword, (_req, res) => {
  res.status(200).json({ token: createToken() });
});

module.exports = auth;