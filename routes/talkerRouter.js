const express = require('express');

const router = express.Router();

const getTalkersId = require('./getTalkersId');
const getTalkers = require('./getTalkers');
const nameValidation = require('./nameValidation');
const ageValidation = require('./ageValidation');
const tokenValidation = require('./tokenValidation');

router.get('/', getTalkers, getTalkersId);
router.post('/', nameValidation, ageValidation, tokenValidation);

module.exports = {
  getTalkersId,
  getTalkers,
  nameValidation,
  ageValidation,
  tokenValidation,
};