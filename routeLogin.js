const express = require('express');
const crypto = require('crypto');

const router = express.Router({
  mergeParams: true,
});

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  if (!email || email === '') {
    return res.state(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.state(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
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

const users = [];

router.get('/', (_req, res) => {
  res.status(200).json(users);
});

router.post('/', validateEmail, validatePassword, (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  res.push({ email, password, token });
  res.status(200);
});

module.exports = router;