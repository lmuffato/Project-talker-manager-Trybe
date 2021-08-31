const express = require('express');
const controller = require('../controllers');
const middlewares = require('../middlewares');

const route = express.Router();

route.post('/login', middlewares.checkLogin, controller.loginUser);

module.exports = route;
