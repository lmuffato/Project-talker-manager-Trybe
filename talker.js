const express = require('express');
const fs = require('fs').promises;

const route = express.Router();
const talkersFile = 'talker.json';

async function findPerson(id) {
  const numbId = parseInt(id, 10);
  const talkers = JSON.parse(await fs.readFile(talkersFile, 'utf8'));
  return talkers.find((object) => object.id === numbId);
}

route.get('/', async (_req, res) => {
  const talkers = JSON.parse(await fs.readFile(talkersFile, 'utf8'));

  return res.status(200).json(talkers);
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;

  const person = await findPerson(id);
  if (!person) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(person);
});

module.exports = route;