const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const talkerArq = './talker.json';

async function talkers() {
  const data = await JSON.parse(await fs.readFile(talkerArq, 'utf-8'));
  return data;
}

function validateTokenTalker(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
}
  
router.get('/',
  validateTokenTalker,
  async (req, res) => {
    const { q } = req.query;
    const talkersArr = await talkers();
    const filteredTalkers = talkersArr.filter((talk) => talk.name.includes(q));
    res.status(200).json(filteredTalkers);
});

module.exports = router;
