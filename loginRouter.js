const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const generateRandomToken = () => crypto.randomBytes(8).toString('hex');

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  const checkedEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email);

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!checkedEmail) {
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

router.post('/', checkEmail, checkPassword, (req, res) => {
  res.status(200).json({ token: generateRandomToken() });
});

module.exports = router;

// Para validação de email utilizei a seguinte referência: https://www.w3resource.com/javascript/form/email-validation.php
// Para saber a existência do Crypto para geração de número aleatórios foi no: https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details