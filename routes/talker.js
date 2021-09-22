const express = require('express');
const bodyParser = require('body-parser');

// Router
const router = express.Router();
router.use(bodyParser.json());

// Middlewares
const {
  getTalkersMiddleware,
  getTalkerByIdMiddleware,
  postTalkerMiddleware,
  putTalkersMiddleware,
  deleteTalkersMiddleware,
} = require('../middlewares');

// Validations
const {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  talkWatchedAtValidation,
  talkRateValidation,
} = require('../validations');

const validations = [
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  talkWatchedAtValidation,
  talkRateValidation,
];

// Routes
router.get('/', getTalkersMiddleware);
router.get('/:talkerId', getTalkerByIdMiddleware);

router.post('/', validations, postTalkerMiddleware);
router.put('/:talkerId', validations, putTalkersMiddleware);
router.delete('/:talkerId', tokenValidation, deleteTalkersMiddleware);

module.exports = router;
