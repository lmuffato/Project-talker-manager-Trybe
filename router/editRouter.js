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

router.put('/:id', findToken, checkToken, findName, checkName,
findAge, checkAge, findTalk, checkRate, checkTalk, checkWhachedAt,
 async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const content = await fs.readFile('./talker.json');
  const talker = JSON.parse(content);
  const otherTalker = talker.filter((t) => t.id !== +id);
  const editedTalker = {
    id: +id,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  otherTalker.push(editedTalker);
  await fs.writeFile('./talker.json', JSON.stringify(otherTalker));
  res.status(200).json(editedTalker);
});

module.exports = router;