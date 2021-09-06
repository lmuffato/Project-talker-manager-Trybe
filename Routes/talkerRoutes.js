const { Router } = require('express');

const router = new Router();

const { readFileTalker } = require('../middleware/getTalkers');

const talkerByID = require('../middleware/getTalkerByID');

router.get('/', readFileTalker);

router.get('/:id', talkerByID);

module.exports = router;