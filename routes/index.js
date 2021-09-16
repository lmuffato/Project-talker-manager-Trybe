const express = require('express');
const authRouter = require('./auth');
const talkerRouter = require('./talker');

const routes = express.Router();

routes.use('/talker', talkerRouter);
routes.use('/login', authRouter);

module.exports = routes;