const express = require('express');

const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const status = require('../status');

const talkerValidation = require('../middlewares/talkerValidation');
const { isTokenValid, tokenExists } = require('../middlewares/tokenValidation');

const router = express.Router();

router.route('/')
  .get((_req, res) => {
    const talkers = readFile('talker.json');
    const hasTalkers = talkers || talkers.length > 0;

      if (!hasTalkers) return res.status(status.ok).json([]);

      res.status(status.ok).json(talkers);
    })
   .post(
      isTokenValid, 
      tokenExists, 
      talkerValidation, 
      (req, res) => {
        const { name, age, talk } = req.body;

        const talkers = readFile('talker.json');

        const id = talkers.length + 1;
        const talker = { id, name, age, talk };

        talkers.push(talker);

        writeFile('talker.json', talkers);

        res.status(status.created).json(talker);
    },
   );

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const talkers = readFile('talker.json');

  const foundTalker = talkers.find((t) => t.id === parseInt(id, 10));

  if (!foundTalker) {
    return res
    .status(status.notFound)
    .json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  res.status(status.ok).json(foundTalker);
});

module.exports = router;
