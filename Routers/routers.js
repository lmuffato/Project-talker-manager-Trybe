const { Router } = require('express');

const {
  getAllTalkers, getTalkerById, addTalker } = require('../talkers');

const { talkerValidator } = require('../Services/validations');

const router = Router();

router.get('/', getAllTalkers);

router.get('/:id', getTalkerById);

router.post('/', talkerValidator, addTalker);

module.exports = router;
