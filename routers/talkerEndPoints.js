const { Router } = require('express');

const { getFilteredTalker, getTalkerList } = require('../middlewares/getTalkers');

const { validateToken } = require('../middlewares/tokenHandlers');

const { newTalkerValidation } = require('../middlewares/talkerValidations');

const { createTalker } = require('../middlewares/createTalker');

const router = Router();

router.get('/', getTalkerList);

router.get('/:id', getFilteredTalker);

router.post('/', validateToken, newTalkerValidation, createTalker);

module.exports = router;