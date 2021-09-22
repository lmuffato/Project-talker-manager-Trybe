const express = require('express');
const STATUS = require('../status/http_status');
const { getAllTalker,
    getSortedTalker,
    generateToken,
    pushNewTalker,
} = require('../middlewares/talker');

const { validateEmail,
    validatePassword,
    validateFields,
    validateData,
    validateToken,
    validateTalk,
} = require('../middlewares/validations');

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(STATUS.SUCCESS.OK).send('Hello World 🚀👩‍🚀');
});

router.get('/talker', getAllTalker);

router.get('/talker/:id', getSortedTalker);

router.post('/login', validateEmail, validatePassword, generateToken);

router.post('/talker', validateToken, validateFields, validateData, validateTalk, pushNewTalker);

module.exports = router;