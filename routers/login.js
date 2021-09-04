const express = require('express');
const crypto = require('crypto');
const { verifyEmail, verifyPassword } = require('../middlewares/middlewares');

const router = express.Router();

const getToken = () => crypto.randomBytes(8).toString('hex');

router.post('/', verifyEmail, verifyPassword, (_req, res) => {
  const token = getToken();
  res.status(200).json({ token });
});

module.exports = router;