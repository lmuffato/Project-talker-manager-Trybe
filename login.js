const express = require('express');

const route = express.Router();

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
} // função retirada de https://ui.dev/validate-email-address-javascript/

function validateEmail(email) {
  if (email === undefined || email === '') {
    return 'O campo \"email\" é obrigatório';
  }
  if (emailIsValid(email) === false) {
    return 'O \"email\" deve ter o formato \"email@email.com\"';
  }
  return 'ok';
}

function validatePassword(password) {
  if (password === undefined || password === '') {
    return 'O campo \"password\" é obrigatório';
  }
  if (password.length < 6) {
    return 'O \"password\" deve ter pelo menos 6 caracteres';
  }
  return 'ok';
}

route.post('/', (req, res) => {
  const { email, password } = req.body;
  const responseEmail = validateEmail(email);
  const responsePassword = validatePassword(password);
  if (responseEmail === 'ok' && responsePassword === 'ok') {
    return res.status(200).json({ token: '7mqaVRXJSp886CGr' });
  }
  if (responsePassword !== 'ok') {
    return res.status(400).json({ message: responsePassword });
  }
    return res.status(400).json({ message: responseEmail });
});

module.exports = route;