const { Router } = require('express');
const { getAllTalkers, getTalkerById, addTalker } = require('./getTalkers');
const allTalkerValidations = require('./validation');

const routerTalker = Router();

routerTalker.get('/', getAllTalkers);

routerTalker.get('/:id', getTalkerById);

routerTalker.post('/', allTalkerValidations, addTalker); 

module.exports = routerTalker;