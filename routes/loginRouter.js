const express = require('express');
const crypto = require('crypto');
const {
  validateEmail,
  validatePassword,
} = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/', validateEmail, validatePassword, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

module.exports = router;
