const { Router } = require('express');
const {
  getAllTalkers, getTalkerById, addTalker, editTalker, deleteTalker } = require('./getTalkers');
const { allTalkerValidations } = require('./validation');

const routerTalker = Router();

routerTalker.get('/', getAllTalkers);

routerTalker.get('/:id', getTalkerById);

routerTalker.post('/', allTalkerValidations, addTalker); 

routerTalker.put('/:id', allTalkerValidations, editTalker);

routerTalker.delete('/:id', deleteTalker);

module.exports = routerTalker;