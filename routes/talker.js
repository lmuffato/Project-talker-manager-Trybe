const express = require('express');
const controller = require('../controllers');
const middlewares = require('../middlewares');

const route = express.Router();

route.get('/talker', middlewares.checkAll, controller.getAll);
route.get('/talker/:id', middlewares.getById, controller.getById);

module.exports = route;