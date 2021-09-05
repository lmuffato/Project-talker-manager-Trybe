const { Router } = require('express');

const getTalkers = require('../talkers/getTalkers');

const getTalkerById = require('../talkers/getTalkerById');

const router = new Router();

router.get('/', getTalkers);

router.get('/:id', getTalkerById);

module.exports = router;