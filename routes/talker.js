const express = require('express');
const STATUS = require('../status/http_status');
const middle = require('../middlewares/talker');

const router = express.Router();
const { getAllTalker, getSortedTalker, validateEmail, validatePassword, generateToken } = middle;

router.get('/', (_req, res) => {
    res.status(STATUS.SUCCESS.OK).send('Hello World 🚀👩‍🚀');
});

router.get('/talker', getAllTalker);

router.get('/talker/:id', getSortedTalker);

router.post('/login', validateEmail, validatePassword, generateToken);

module.exports = router;