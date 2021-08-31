const express = require('express');

const loginRouter = express.Router();
const crypto = require('crypto');

const validateEmail = require('../middleware/validateEmail');
const validatePassword = require('../middleware/validatePasword');

const tokens = ['68cceff8d081335d'];

function generateToken(num) {
  return crypto.randomBytes(num).toString('hex');
}

loginRouter.post('/', validateEmail, validatePassword, (request, response) => {
  const token = generateToken(8);
  tokens.push(token);

  return response.status(200).json({ token });
});

module.exports = { loginRouter, tokens };
