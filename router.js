const { Router } = require('express');
const { getAllTalkers, getTalkerById } = require('./getAllTalkers');

const routerTalker = Router();

routerTalker.get('/', getAllTalkers);

routerTalker.get('/:id', getTalkerById);

module.exports = routerTalker;