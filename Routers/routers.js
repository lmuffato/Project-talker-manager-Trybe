const { Router } = require('express');

const {
  getAllTalkers, getTalkerById, addTalker,
  editTalker, deleteTalker, getSearch } = require('../talkers');

const Validator = require('../Services/validations');

const router = Router();

router.get('/', getAllTalkers);

router.get('/search', Validator.validToken, getSearch);

router.get('/:id', getTalkerById);

router.post('/', Validator.validToken, Validator.validName,
Validator.validAge, Validator.validTalk, Validator.validTalkKeys, addTalker);

router.put('/:id', Validator.validToken, Validator.validName,
Validator.validAge, Validator.validTalk, Validator.validTalkKeys, editTalker);

router.delete('/:id', Validator.validToken, deleteTalker);

module.exports = router;
