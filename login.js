const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const token = () => crypto.randomBytes(8).toString('hex');

const emailValidate = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!(email.includes('@') && email.includes('.com'))) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const passwordValidate = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

router.post('/', emailValidate, passwordValidate, (req, res, _next) => {
  try {
   return res.status(200).json({ token: token() });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;