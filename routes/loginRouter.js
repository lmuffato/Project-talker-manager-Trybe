const express = require('express');

const router = express.Router();
const crypto = require('crypto');

const validateEmail = require('../middleware/validateEmail');
const validatePassword = require('../middleware/validatePasword');

function generateToken(num) {
  return crypto.randomBytes(num).toString('hex');
}

router.post('/', validateEmail, validatePassword, (request, response) => {
  const token = generateToken(8);

  return response.status(200).json({ token });
});

module.exports = router;
