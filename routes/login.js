const express = require('express');
const { generateToken } = require('../middlewares/talker');
const { validateEmail, validatePassword } = require('../middlewares/validations');

const router = express.Router();

router.post('/login', validateEmail, validatePassword, generateToken);

module.exports = router;