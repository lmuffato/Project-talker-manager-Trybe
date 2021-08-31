const { Router } = require('express');
const { getTalkers, getTalker } = require('../controllers/talker');

const routes = Router();

routes.get('/', getTalkers);
routes.get('/:id', getTalker);

module.exports = routes;
