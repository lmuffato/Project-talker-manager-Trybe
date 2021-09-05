const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const fs = require('fs').promises;
const { validateToken } = require('./token');
const { 
  nameValidation, 
  ageValidation, 
  talkValidation, 
  talkValidationMandatory,
} = require('./MiddlewaresValidation');

router.use(bodyParser.json());

router.get('/', async (_req, res) => {
  try {
    const talker = await fs.readFile('./talker.json', 'utf8');
    res.status(200).json(JSON.parse(talker));
  } catch (err) {
    res.status(500).send(err.message);
  } 
});

router.post('/', 
validateToken, 
nameValidation, 
ageValidation, 
talkValidation, 
talkValidationMandatory, 
async (req, res) => {
  const talker = await fs.readFile('./talker.json', 'utf8');
  const talkerParse = JSON.parse(talker);
  const { name, age, talk } = req.body;

  const newPeople = {
    name,
    age,
    id: talkerParse.length + 1,
    talk,
  };
  
  talkerParse.push(newPeople);
  await fs.writeFile('./talker.json', JSON.stringify(talkerParse));

  res.status(201).json(newPeople);
}); 

router.get('/:id', async (req, res) => {
  const talker = await fs.readFile('./talker.json', 'utf8');
  const { id } = req.params;
  const people = JSON.parse(talker).find((p) => p.id === +id);
  
  if (!people) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(people);
});
    
module.exports = router;