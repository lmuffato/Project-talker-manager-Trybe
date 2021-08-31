const express = require('express');
const controller = require('../controllers');
const middlewares = require('../middlewares');

const route = express.Router();

route.get('/talker', middlewares.checkAllTalkers, controller.getAll);

module.exports = route;