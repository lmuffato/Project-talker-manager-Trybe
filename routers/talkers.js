const express = require('express');
const tasks = require('../middlewares/tasks');
const validations = require('../middlewares/validations');

const talkers = express.Router();

talkers.get('/', tasks.getAllTalkers);
talkers.get('/search', validations[0]);
talkers.get('/:id', tasks.getTalkerId);
talkers.post('/', ...validations, tasks.createTalker);
talkers.put('/:id', ...validations, tasks.editTalker);
talkers.delete('/:id', validations[0], tasks.deleteTalker);

module.exports = talkers;
