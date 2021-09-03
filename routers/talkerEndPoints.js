const { Router } = require('express');

const { getFilteredTalker, getTalkerList } = require('../middlewares/getTalkers');

const { validateToken } = require('../middlewares/tokenHandlers');

const {
  newTalkerValidation,
  createTalker,
  editTalker } = require('../middlewares/newTalkerHandler');

const router = Router();

router.get('/', getTalkerList);

router.get('/:id', getFilteredTalker);

router.post('/', validateToken, newTalkerValidation, createTalker);

router.put('/:id', validateToken, newTalkerValidation, editTalker);

module.exports = router;