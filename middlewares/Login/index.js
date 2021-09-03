const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const {
  validateEmail,
  validatePassword
} = require('../validators');

router.post('/', validateEmail, validatePassword, (_req, res) => {
  const randomToken = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token: randomToken });
});

module.exports = router;