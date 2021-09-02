const { Router } = require('express');
const {
  getTalkers,
  getTalker,
  postTalker,
  putTalker,
  deleteTalker,
} = require('../controllers/talker');
const { tokenAuthentication } = require('../middlewares/authentication');
const { validateName, validateAge, validateTalk } = require('../middlewares/validation');

const routes = Router();

routes.get('/', getTalkers);
routes.get('/:id', getTalker);
routes.post('/', tokenAuthentication, validateName, validateAge, validateTalk, postTalker);
routes.put('/:id', tokenAuthentication, validateName, validateAge, validateTalk, putTalker);
routes.delete('/:id', tokenAuthentication, deleteTalker);

module.exports = routes;
