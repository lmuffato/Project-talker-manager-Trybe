const { Router } = require('express');

const router = new Router();

const { readFileTalker } = require('../middleware/getTalkers');

router.get('/', readFileTalker);

module.exports = router;