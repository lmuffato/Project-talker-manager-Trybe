const express = require('express');

const router = express.Router();

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!email.match(emailRegex)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

router.post('/', validateEmail, validatePassword, (req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

module.exports = router;