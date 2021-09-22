const express = require('express');
const crypto = require('crypto');

const { 
  validateEmail, 
  validatePassword } = require('../middlewares/middlewares');

const router = express.Router();

const getToken = () => crypto.randomBytes(8).toString('hex');
const validations = [validateEmail, validatePassword];

router.post('/', validations, (_req, res) => {
  const token = getToken();
  res.status(200).json({ token });
});

module.exports = router;
