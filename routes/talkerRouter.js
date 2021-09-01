const express = require('express');

const router = express.Router();

const getAllTalkers = require('../middleware/req1');
const getTalkerById = require('../middleware/req2');
const createTalker = require('../middleware/req4');
const editTalker = require('../middleware/req5');
const deleteTalker = require('../middleware/req6');
const searchTalker = require('../middleware/req7');

const validations = require('../validations/talkerValidations');

const [validateToken] = validations;

// requisito 1
router.get('/', getAllTalkers);

// requisito 4
router.post('/', validations, createTalker);

// requisito 7
router.get('/search', validateToken, searchTalker);

// requisito 2
router.get('/:id', getTalkerById);

// requisito 5
router.put('/:id', validations, editTalker);

// requisito 6
router.delete('/:id', validateToken, deleteTalker);

module.exports = router;