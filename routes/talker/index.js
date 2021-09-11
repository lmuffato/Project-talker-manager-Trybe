const router = require('express').Router();

const get = require('./get');

router.use(get);

module.exports = router;
