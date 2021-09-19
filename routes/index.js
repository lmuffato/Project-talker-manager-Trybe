const express = require('express');
const authMiddleware = require('../middlewares/auth');
const { getAllTalkers } = require('../services');
const authRouter = require('./auth');
const talkerRouter = require('./talker');

const routes = express.Router();
const HTTP_OK_STATUS = 200;

routes.use('/talker/search', authMiddleware, async (_request, response) => {
  const data = await getAllTalkers();
  const filterData = data.filter((talkerData) => talkerData.name.includes(_request.query.q));
  response.status(HTTP_OK_STATUS).send(filterData);
});

routes.use('/talker', talkerRouter);
routes.use('/login', authRouter);

module.exports = routes;