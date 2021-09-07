const express = require('express');
const crypto = require('crypto');
const midd = require('./middleware');

const router = express.Router();

const token = () => crypto.randomBytes(8).toString('hex');

router.post('/', midd.emailValidate, midd.passwordValidate, (req, res, _next) => {
  try {
   return res.status(200).json({ token: token() });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;