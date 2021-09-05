const express = require('express');

const router = express.Router();
const { login } = require('../middlewares');

router.post('/', login);

module.exports = router;
