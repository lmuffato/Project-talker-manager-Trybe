const express = require('express');
const crypto = require('crypto-extra');
const myModule = require('../modules');

const login = express.Router();
const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 400;

login.post('', (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomKey(16);
  const emailMessage = myModule.validateEmail(email);
  const passwordMessage = myModule.validatePassword(password);
  if (emailMessage) {
    return res.status(HTTP_BAD_REQUEST).json(emailMessage);
  } 
  if (passwordMessage) {
    return res.status(HTTP_BAD_REQUEST).json(passwordMessage);
  }
  
  res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = login;
