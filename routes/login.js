// requisito 3 realizado com ajuda do estudante Nilson Ribeiro

const { Router } = require('express');
const tokenGeneration = require('../Utils/token');
const password = require('../Utils/passwordValidation');
const email = require('../Utils/emailValidation');

const router = Router();
const valid = [email, password];

router.post('/', ...valid, (_res, res) => {
    const token = tokenGeneration(16);
    return res.status(200).json({ token });
});

module.exports = router;
