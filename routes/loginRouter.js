const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');
const { verifiedToken, verifiedEmail } = require('../middlewares/loginValidations');

router.post('/', verifiedToken, verifiedEmail, rescue((_req, res) => 
    res.status(200).json({ token: '7mqaVRXJSp886CGr' })));

module.exports = router;