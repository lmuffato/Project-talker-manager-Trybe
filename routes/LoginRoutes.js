const express = require('express');

const router = express.Router();
const tokenGenerate = require('rand-token');
const emailValidator = require('email-validator');

const getToken = () => tokenGenerate.generate(16);

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const emailValid = emailValidator.validate(email);

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailValid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

router.post('/', emailValidation, passwordValidation, (_req, res) => {
  const token = getToken();
  res.status(200).json({ token });
});

module.exports = router;
