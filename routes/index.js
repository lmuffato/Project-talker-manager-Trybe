const express = require('express');
const talkerRouter = require('./talker');

const routes = express.Router();

routes.use('/talker', talkerRouter);

module.exports = routes;