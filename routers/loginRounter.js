const express = require('express');
const crypto = require('crypto');

const { 
  validateLogin,
  validateEmail, 
  validatePassword } = require('../middlewares/middlewaresLogin');

const router = express.Router();

const getToken = () => crypto.randomBytes(8).toString('hex');
const validations = [validateLogin, validateEmail, validatePassword];

router.post('/', validations, (_req, res) => {
  const token = getToken();
  res.status(200).json({ token });
});

module.exports = router;
