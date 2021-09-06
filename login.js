const express = require('express');
const crypto = require('crypto');
const midd = require('./middleware');

const router = express.Router();

router.post('/', midd.emailValidate, midd.passwordValidate, async (_req, res) => {
    try {
        const token = crypto.randomBytes(8).toString('hex');
        return res.status(200).json(token);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;