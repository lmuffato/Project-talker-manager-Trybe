const { Router } = require('express');

const router = new Router();

const { generateToken } = require('../utils/functions');

const emailValidation = require('../validations/emailValidation');

const passwordValidation = require('../validations/passwordValidation');

router.post('/', emailValidation, passwordValidation, (_request, response) => {
    const token = generateToken(16);
    response.status(200).json({ token });
});

module.exports = router;
