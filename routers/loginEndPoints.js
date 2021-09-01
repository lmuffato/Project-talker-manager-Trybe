const { Router } = require('express');

const router = Router();

const { validateEmail, validatePassword } = require('../middlewares/AcessValidations');

const { createToken } = require('../middlewares/tokenHandlers');

router.post('/', validateEmail, validatePassword, createToken);

module.exports = router;
