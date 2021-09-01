const { Router } = require('express');
const { getAllTalkers, getTalkerById } = require('./getTalkers');

const routerTalker = Router();

routerTalker.get('/', getAllTalkers);

routerTalker.get('/:id', getTalkerById);

/* routerTalker.post('/', addTalker); 
adicionar na importação addTalker */

module.exports = routerTalker;