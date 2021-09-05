const { Router } = require('express');

const getTalkers = require('../talkers/getTalkers');

const getTalkerById = require('../talkers/getTalkerById');

const addTalker = require('../talkers/addTalker');

const tokenValidation = require('../validations/tokenValidation');

const router = new Router();

router.get('/', getTalkers);

router.get('/:id', getTalkerById);

router.post('/', tokenValidation, addTalker);

module.exports = router;