const express = require('express');

const router = express.Router();

const checkLoginMidd = require('../Middlewares/checkLoginMidd.js');

router.post('/', checkLoginMidd);

module.exports = router;
