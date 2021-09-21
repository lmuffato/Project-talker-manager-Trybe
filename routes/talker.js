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
} = require('../middlewares');

// Validations
const {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkAndWatchedAtValidation,
  talkRateValidation
} = require('../validations');

const validationsMiddlewares = [
  tokenValidation,
  nameValidation,
  ageValidation,
  talkAndWatchedAtValidation,
  talkRateValidation,
];

// Routes
router.get('/', getTalkersMiddleware);
router.get('/:talkerId', getTalkerByIdMiddleware);

router.post('/', validationsMiddlewares, postTalkerMiddleware);

module.exports = router;
