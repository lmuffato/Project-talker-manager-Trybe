const express = require('express');

const router = express.Router();

const crypto = require('crypto');

const password = require('../Middlewares/passwordValidate');
const email = require('../Middlewares/emailValidate');

const token = crypto.randomBytes(8).toString('hex');
router.post('/', email, password, (req, res) => {
res.status(200).send({ token });
});

module.exports = router;
