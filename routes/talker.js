const { Router } = require('express');
const { getTalkers } = require('../controllers/talker');

const routes = Router();

routes.get('/', getTalkers);

module.exports = routes;
