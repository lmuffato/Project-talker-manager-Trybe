const { Router } = require('express');

const router = new Router();

const getTalkers = require('../middleware/getTalkers');

const talkerByID = require('../middleware/getTalkerByID');

router.get('/', getTalkers);

router.get('/:id', talkerByID);

module.exports = router;