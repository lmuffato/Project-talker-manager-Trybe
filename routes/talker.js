const express = require('express');
const STATUS = require('../status/http_status');

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(STATUS.SUCCESS.OK).send('Hello World 🚀👩‍🚀');
});

module.exports = router;