const express = require('express');

const router = express.Router();

const login = require('../middleware/req3');
const loginValidation = require('../validations/loginValidation');

const { validateEmail, validatePassword } = loginValidation;
// requisito 3
router.post('/', validateEmail, validatePassword, login);

module.exports = router;
