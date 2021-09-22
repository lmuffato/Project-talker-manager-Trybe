const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const {
  getTalkersMiddleware,
  getTalkerByIdMiddleware,
  postTalkerMiddleware,
  putTalkersMiddleware,
  deleteTalkersMiddleware,
  getTalkersBySearch,
} = require('./middlewares.js');

const {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  talkWatchedAtValidation,
  talkRateValidation,
} = require('./validations.js');

const validations = [
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  talkWatchedAtValidation,
  talkRateValidation,
];

router.get('/', getTalkersMiddleware);
router.get('/search', tokenValidation, getTalkersBySearch);
router.get('/:talkerId', getTalkerByIdMiddleware);

router.post('/', validations, postTalkerMiddleware);
router.put('/:talkerId', validations, putTalkersMiddleware);
router.delete('/:talkerId', tokenValidation, deleteTalkersMiddleware);

module.exports = router;