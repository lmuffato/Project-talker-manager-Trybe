const { Router } = require('express');
const fs = require('fs').promises;

const router = Router();

const functions = require('./functions');

const { findToken,
  checkToken,
  findName,
  checkName,
  findAge,
  checkAge,
  findTalk,
  checkTalk,
  checkRate, 
  checkWhachedAt } = functions;

router.post('/', 
findToken, checkToken, 
findName, checkName, 
findAge, checkAge, 
findTalk, checkTalk,
checkRate, checkWhachedAt, async (req, res) => {
const { name, age, talk: { watchedAt, rate } } = req.body;
const content = await fs.readFile('./talker.json');
const talker = JSON.parse(content);
const newTalker = {
  name,
  age,
  id: (talker.length + 1),
  talk: {
    rate,
    watchedAt,
  },
};
  talker.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talker));
  res.status(201).json(newTalker);
});

module.exports = router;