const express = require('express');

const router = express.Router();
const middlewares = require('../middlewares');

router.get('/', middlewares.getTalkers);

router.get('/:id', middlewares.endpoint);

module.exports = router;