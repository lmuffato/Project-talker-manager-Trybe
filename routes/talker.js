const express = require('express');
const STATUS = require('../status/http_status');
const middle = require('../middlewares/talker');

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(STATUS.SUCCESS.OK).send('Hello World 🚀👩‍🚀');
});

router.get('/talker', middle.getAllTalker);

module.exports = router;