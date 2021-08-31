const express = require('express');

const router = express.Router();
const middlewares = require('../middlewares');

router.post('/', 
  middlewares.emailVerification, 
  middlewares.passwordVerification, 
  (req, res) => res.status(200).json({ token: '7mqaVRXJSp886CGr' }));

module.exports = router;