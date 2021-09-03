const { Router } = require('express');

const { getFilteredTalker, getTalkerList, searchTalkers } = require('../middlewares/getTalkers');

const { validateToken } = require('../middlewares/tokenHandlers');

const {
  newTalkerValidation,
  createTalker,
  editTalker,
  deleteTalker } = require('../middlewares/talkerListHandler');

const router = Router();

router.get('/', getTalkerList);

router.get('/search', validateToken, searchTalkers);

router.get('/:id', getFilteredTalker);

router.post('/', validateToken, newTalkerValidation, createTalker);

router.put('/:id', validateToken, newTalkerValidation, editTalker);

router.delete('/:id', validateToken, deleteTalker);

module.exports = router;