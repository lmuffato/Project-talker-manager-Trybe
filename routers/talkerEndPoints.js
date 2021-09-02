const { Router } = require('express');

const { getFilteredTalker, getTalkerList } = require('../middlewares/getTalkers');

const { validateToken } = require('../middlewares/tokenHandlers');

const { newTalkerValidation, createTalker } = require('../middlewares/newTalkerHandler');

const router = Router();

router.get('/', getTalkerList);

router.get('/:id', getFilteredTalker);

router.post('/', validateToken, newTalkerValidation, createTalker);

module.exports = router;