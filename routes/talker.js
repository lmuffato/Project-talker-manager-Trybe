const express = require('express');

const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const status = require('../status');

const talkerValidation = require('../middlewares/talkerValidation');
const { isTokenValid, tokenExists } = require('../middlewares/tokenValidation');

const router = express.Router();

const talkers = () => readFile('talker.json');

router.route('/')
  .get((_req, res) => {
    const hasTalkers = talkers() || talkers.length > 0;

      if (!hasTalkers) return res.status(status.ok).json([]);

      res.status(status.ok).json(talkers());
    })
   .post(
      isTokenValid, 
      tokenExists, 
      talkerValidation, 
      (req, res) => {
        const { name, age, talk } = req.body;
        const newTalkers = talkers();

        const id = newTalkers.length + 1;
        const talker = { id, name, age, talk };

        newTalkers.push(talker);

        writeFile('talker.json', newTalkers);

        res.status(status.created).json(talker);
    },
   );

router.route('/:id')
  .get((req, res) => {
  const { id } = req.params;
  const foundTalker = talkers().find((t) => t.id === parseInt(id, 10));

  if (!foundTalker) {
    return res
    .status(status.notFound)
    .json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  res.status(status.ok).json(foundTalker);
  })
  .put(
    isTokenValid,
    tokenExists,
    talkerValidation,
    (req, res) => {
      const { name, age, talk } = req.body;
      const { id } = req.params;
      const newTalkers = talkers();
      const foundedTalkerIndex = newTalkers.findIndex((t) => t.id === parseInt(id, 10));
      
      if (!foundedTalkerIndex) {
        return res.status(status.notFound).json({ message: 'Palestrante não encontrado' }); 
      }

      newTalkers[foundedTalkerIndex] = {
        ...newTalkers[foundedTalkerIndex],
        name,
        age,
        talk,
      };

      writeFile('talker.json', newTalkers);
      res.status(status.ok).json(newTalkers[foundedTalkerIndex]);
    },
  );

module.exports = router;
