const express = require('express');

const router = express.Router();
const randToken = require('rand-token');

const generateToken = () => randToken.generate(16);

const authEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.match(/^[^@\s]+@[^@\s.]+\.[^@.\s]+$/)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const authPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

router.post('/', authEmail, authPassword, (_req, res) => {
  const token = generateToken();

  return res.status(200).json({ token });
});

module.exports = router;
