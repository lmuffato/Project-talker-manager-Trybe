const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs').promises;

const router = express.Router();

function getTalkers() {
 return fs.readFile('./talker.json', 'utf-8').then((result) => JSON.parse(result));
}

router.get('/', async (_req, res) => {
  try {
    const talkerPeople = await getTalkers();
    if (talkerPeople.length === 0) return res.status(200).send([]);
    return res.status(200).send(talkerPeople);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', rescue(async (req, res) => {
  const talkerPeople = await getTalkers();

  const talker = talkerPeople.find(({ id }) => id === Number(req.params.id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talker);
}));

module.exports = router;
