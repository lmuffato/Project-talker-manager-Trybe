const express = require('express');
const fs = require('fs').promises;
const { setTalkers } = require('../middlewares');

const router = express.Router();
const middlewares = require('../middlewares');

router.get('/:id', middlewares.endpoint);

router.post('/', 
  middlewares.tokenVerification,
  middlewares.nameVerification,
  middlewares.ageVerification,
  middlewares.talkObjectVerification,
  middlewares.watchedAtVerification,
  middlewares.rateVerification,
  async (req, res) => {
    const { name, age, talk } = req.body;

    const talkers = await fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent)).catch((err) => console.log(err));
    const id = talkers.length + 1;

    const newTalker = ({ name, age, id, talk });

    talkers.push(newTalker);

    const stringifyTalkers = JSON.stringify(talkers);

    await setTalkers(stringifyTalkers);

    res.status(201).json(newTalker);
  });

router.get('/', middlewares.getTalkers);

module.exports = router;