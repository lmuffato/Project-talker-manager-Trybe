const { Router } = require('express');

const addTalker = require('../talkers/addTalker');
const getter = require('../talkers/get');
const getById = require('../talkers/getID');

const router = Router();

router.get('/', getter);
router.get('/:id', getById);
router.post('/', addTalker);

module.exports = router;