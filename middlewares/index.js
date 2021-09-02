const talkerId = require('./talkerId');
const talker = require('./talker');
const login = require('./login');
const addMiddlewares = require('./addMiddlewares');
const searchMiddlewares = require('./searchMiddlewares');
const deleteMiddlewares = require('./deleteMiddlewares');
const editMiddlewares = require('./editMiddlewares');
const validateToken = require('./validateToken');
const validatesMiddlewares = require('./validatesMiddlewares');

module.exports = {
  talker,
  talkerId,
  login,
  addMiddlewares,
  searchMiddlewares,
  deleteMiddlewares,
  editMiddlewares,
  validateToken,
  validatesMiddlewares,
};
