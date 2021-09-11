const router = require('express').Router();

const post = require('./post');

router.use(post);

module.exports = router;
