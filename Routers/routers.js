const { Router } = require('express');

const {
  getAllTalkers, getTalkerById, addTalker, editTalker } = require('../talkers');

const { talkerValidator } = require('../Services/validations');

const router = Router();

router.get('/', getAllTalkers);

router.get('/:id', getTalkerById);

router.post('/', talkerValidator, addTalker);

router.put('/:id', talkerValidator, editTalker);

module.exports = router;
