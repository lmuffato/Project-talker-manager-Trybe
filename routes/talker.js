const { Router } = require('express');

// const fs = require('fs').promises;

// const { StatusCodes } = require('http-status-codes');

const getTalkers = require('../talkers/getTalkers');

const getTalkerById = require('../talkers/getTalkerById');

const addTalker = require('../talkers/addTalker');

const editedTalker = require('../talkers/editTalker');

const deletTalker = require('../talkers/deletTalker');

const tokenValidation = require('../validations/tokenValidation');

const nameValid = require('../validations/nameValidation');

const ageValidation = require('../validations/ageValidation');

const dateRate = require('../validations/dateRate');

const talkValidation = require('../validations/talkValidation');

const validations = [
  tokenValidation,
  ageValidation,
  talkValidation,
  dateRate,
  nameValid,
];

const router = new Router();

router.get('/', getTalkers);

router.get('/:id', getTalkerById);

router.post('/', ...validations, addTalker);

router.put('/:id', ...validations, editedTalker);

router.delete('/:id', tokenValidation, deletTalker);

module.exports = router;