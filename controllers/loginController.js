const express = require('express');
const { validateEmail, validatePassword, generateToken } = require('../middlewares');

const router = express.Router();

router.post('/', validateEmail, validatePassword,
  async (_req, res) => res.status(200).json({ token: generateToken() }));

module.exports = router;