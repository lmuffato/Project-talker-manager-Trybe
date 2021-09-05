const express = require('express');
const fs = require('fs').promises;
const { verifyEmail, verifyPassword } = require('../middlewares/login');
const generateToken = require('../utils/generateToken');

const router = express.Router();

router.post('/', verifyEmail, verifyPassword, async (_req, res) => {
  const token = generateToken();
  await fs.writeFile('tokens.txt', token);

  return res.status(200).json({ token });
});

module.exports = router;