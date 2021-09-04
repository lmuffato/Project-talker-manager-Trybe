const express = require('express');
const fs = require('fs').promises;

const { HTTP_OK_STATUS } = require('../utils/httpStatus');
const generateToken = require('../utils/generateToken');

const router = express.Router();

const verifyEmail = require('../utils/verifyEmail');
const verifyPassword = require('../utils/verifyPassword');

router.post('/', verifyEmail, verifyPassword, async (_req, res) => {
  const token = generateToken();
  await fs.writeFile('token.txt', token);
  return res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;
