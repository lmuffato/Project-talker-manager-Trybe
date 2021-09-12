const router = require('express').Router();

const get = require('./get');
const post = require('./post');

router.use(get, post);

module.exports = router;
