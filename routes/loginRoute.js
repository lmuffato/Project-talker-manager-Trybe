const express = require('express');

const router = express.Router();
const loginEmail = require('./loginEmail');
const loginPassword = require('./loginPassword');

router.post('/', 
  loginEmail, loginPassword,  
  (req, res) => res.status(200).json({ token: '7mqaVRXJSp886CGr' }));

module.exports = router;
