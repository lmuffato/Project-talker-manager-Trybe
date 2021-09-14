// https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
const express = require('express');
const token = require('./generateToken');

const router = express.Router();

function validateEmailLogin(em) {
  const regEmail = /\S+@\S+\.\S+/;
  console.log(regEmail.test(regEmail));
  if (!em) {
    throw new Error('O campo "email" é obrigatório');
  }
  if (!regEmail.test(em)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
}

function validatePasswordLogin(pass) {
  if (!pass || pass === '') {
    throw new Error('O campo "password" é obrigatório');
  }
  if (pass.length < 6) {
    throw new Error('O "password" deve ter pelo menos 6 caracteres');
  }
}

router.post('/', (req, res) => {
  const { email, password } = req.body;
  try {
    validateEmailLogin(email);
    validatePasswordLogin(password);
    res.status(200).json({ token });  
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
