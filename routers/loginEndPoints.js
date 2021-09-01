const { Router } = require('express');

const router = Router();

const { validateEmail, validatePassword } = require('../middlewares/validations');

const createToken = require('../middlewares/createToken');

router.post('/', validateEmail, validatePassword, createToken);

module.exports = router;
