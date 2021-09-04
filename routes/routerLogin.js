const express = require('express');

const router = express.Router();
const { login } = require('../middlewares');

router.post('/', 
  login, 
  (_req, res) => res.status(200).json({ token: '7mqaVRXJSp886CGr' }));

module.exports = router;
