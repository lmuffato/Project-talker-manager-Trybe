const express = require('express');
const tasks = require('../middlewares/tasks');
const validations = require('../middlewares/validations');

const talkers = express.Router();
const [validateToken] = validations;

talkers.get('/', tasks.getAllTalkers);
talkers.get('/search', validateToken, tasks.searchTalkers);
talkers.get('/:id', tasks.getTalkerId);
talkers.post('/', ...validations, tasks.createTalker);
talkers.put('/:id', ...validations, tasks.editTalker);
talkers.delete('/:id', validateToken, tasks.deleteTalker);

module.exports = talkers;
