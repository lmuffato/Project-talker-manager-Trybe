const express = require('express');
const validateEmail = require('../middlewares/emailAuthMiddle');
const validatePassword = require('../middlewares/passwordAuthMiddle');
const tokenGeneretor = require('../services/tokenGenerator');

const router = express.Router();

router.post('/', validateEmail, validatePassword, (req, res) => {
  const token = tokenGeneretor();
  return res.status(200).json({ token });
});

module.exports = router;