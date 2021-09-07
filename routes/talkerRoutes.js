const { Router } = require('express');

// const fs = require('fs').promises;

// const { StatusCodes } = require('http-status-codes');

const getTalkers = require('../talkers/getTalkers');

const getTalkerById = require('../talkers/getTalkerById');

const addTalker = require('../talkers/addTalker');

const tokenValidation = require('../validations/tokenValidation');

const nameValidation = require('../validations/nameValidation');

const ageValidation = require('../validations/ageValidation');

const dateRate = require('../validations/dateRate');

const talkValidation = require('../validations/talkValidation');

const validations = [
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  dateRate,
];

const router = new Router();

router.get('/', getTalkers);

router.get('/:id', getTalkerById);

router.post('/', ...validations, addTalker);

module.exports = router;