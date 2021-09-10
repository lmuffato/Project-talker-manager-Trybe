const fs = require('fs');
const express = require('express');
const talkersList = require('../talker.json');

const router = express.Router();

const getTalkersId = require('./getTalkersId');
const getTalkers = require('./getTalkers');
const nameValidation = require('./nameValidation');
const ageValidation = require('./ageValidation');
const tokenValidation = require('./tokenValidation');
const { rateValidation, watValidation } = require('./talkValidation');

const validations = [nameValidation, ageValidation, tokenValidation, rateValidation, watValidation];

router.get('/', getTalkers);
router.get('/:id', getTalkersId);

router.post('/', validations, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = getTalkers();
  const newTalker = {
    id: talkers.length + 1,
    name,
    age: parseInt(age, 10),
    talk: {
      watchedAt,
      rate: parseInt(rate, 10),
    },
  };
  const addTalker = talkers.push(newTalker);
  await fs.writeFile(talkersList, JSON.stringify(addTalker));
  return res.status(201).json(newTalker);
});

module.exports = {
  getTalkers,
  getTalkersId,
};