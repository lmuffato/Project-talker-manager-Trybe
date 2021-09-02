const { Router } = require('express');

const addTalker = require('../talkers/addTalker');
const deleteTalker = require('../talkers/deleteTalker');
const editTalker = require('../talkers/editTalker');
const searchTalker = require('../talkers/searchTalker');
const getter = require('../talkers/get');
const getById = require('../talkers/getID');
const { name, age, talk, rateDate, token } = require('../validations/index.js');

const addValidation = [token, name, age, talk, rateDate];
const router = Router();

router.get('/search', token, searchTalker);
router.get('/', getter);
router.get('/:id', getById);
router.post('/', ...addValidation, addTalker);
router.put('/:id', ...addValidation, editTalker);
router.delete('/:id', token, deleteTalker);
module.exports = router;