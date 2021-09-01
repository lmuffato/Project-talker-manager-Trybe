const { Router } = require('express');
const crypto = require('crypto');
const { isValidEmail, isValidPassword } = require('../Validations/validations');

const router = Router();

const token = crypto.randomBytes(8).toString('hex');

router.post('/', isValidEmail, isValidPassword, (req, res) =>
  res.status(200).json({ token: `${token}` }));

module.exports = router;
