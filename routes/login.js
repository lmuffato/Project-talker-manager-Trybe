const express = require('express');

const fs = require('fs').promises;

const router = express.Router();
const crypto = require('crypto');

const emailVerification = require('../middleware/EmailVerification');
const passwordVerification = require('../middleware/PasswordVerification');

router.post('/', emailVerification, passwordVerification, async (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  // const token = '0fd663466aaa5297';

  await fs.writeFile('token.txt', token)
    .catch((err) => console.error(err));
  res.status(200).json({ token });
});

module.exports = router;