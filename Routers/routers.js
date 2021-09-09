const { Router } = require('express');

const {
  getAllTalkers, getTalkerById } = require('../talkers');

const router = Router();

router.get('/', getAllTalkers);

router.get('/:id', getTalkerById);

module.exports = router;
