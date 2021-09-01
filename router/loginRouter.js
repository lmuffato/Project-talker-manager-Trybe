const { Router } = require('express');

const router = Router();

const functions = require('./functions');

const { verifyEmailExists,
  verifyEmailPattern,
  verifyPasswordExists,
  verifyPasswordLenght,
  generateToken } = functions;

router.post('/', 
verifyEmailExists, verifyEmailPattern, 
verifyPasswordExists, verifyPasswordLenght, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

module.exports = router;