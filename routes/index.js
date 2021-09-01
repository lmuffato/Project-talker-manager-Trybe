const routes = require('express').Router();
const { HTTP_OK_STATUS } = require('../util/constants');
const login = require('./login');
const talker = require('./talker');

routes.use('/talker', talker);
routes.use('/login', login);
// não remova esse endpoint, e para o avaliador funcionar
routes.get('/', (_req, res) => {
  res.status(HTTP_OK_STATUS).send();
});

module.exports = routes;
