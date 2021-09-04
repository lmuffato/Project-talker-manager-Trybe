const express = require('express');
const rescue = require('express-rescue');
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
  rescue(async (req, res) => {
    const { name, age, talk } = req.body;

    const TalkerJSON = await fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
    const id = TalkerJSON.length + 1;

    const newTalker = ({ name, age, id, talk });

    TalkerJSON.push(newTalker);

    await setTalkers(TalkerJSON);

    res.status(201).json(newTalker);
  }));

router.get('/', middlewares.getTalkers);

module.exports = router;