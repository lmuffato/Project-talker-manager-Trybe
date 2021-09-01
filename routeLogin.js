const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

router.post('/', validateEmail, validatePassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

module.exports = router;

// teste