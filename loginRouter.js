const generator = require('generate-password');
const express = require('express');

const router = express.Router();

const REGMAIL = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

const validateEmail = (email) => {
  if (!email || email === '') {
    throw new Error('O campo "email" é obrigatório');
  } else if (!REGMAIL.test(email)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
};

const validatePassword = (password) => {
  if (!password || password === '') {
    throw new Error('O campo "password" é obrigatório');
  } else if (password.length < 6) {
    throw new Error('O "password" deve ter pelo menos 6 caracteres');
  }
};

router.post('/', (req, res) => {
  const { email, password } = req.body;
  try {
    validateEmail(email);
    validatePassword(password);

    res.status(200).json({ token: generator.generate({
      length: 16,
      numbers: true,
    }) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
