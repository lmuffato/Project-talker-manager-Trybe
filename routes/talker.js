const express = require('express');
const controller = require('../controllers');
const middlewares = require('../middlewares');

const route = express.Router();

route.get('/talker', middlewares.checkAll, controller.getAll);
route.get('/talker/:id', middlewares.getById, controller.getById);
// Existe um jeito bonitão de refatorar essa chamada de middleware, o Renatão fez isso na aula ao vivo ... ver lá depois
route.post('/talker', middlewares.checkToken, middlewares.checkName, middlewares.checkTalk,
middlewares.checkAge, middlewares.checkRate, middlewares.checkDate, 
controller.createTalker);

module.exports = route;
