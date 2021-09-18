const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const talkerArq = './talker.json';

async function talkers() {
  const data = await JSON.parse(await fs.readFile(talkerArq, 'utf-8'));
  return data;
}

async function saveTalker(talkersArr) {
  await fs.writeFile(talkerArq, JSON.stringify(talkersArr, null, '\t'));
 }

 function validateTokenTalker(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
}

router.delete('/:id',
  validateTokenTalker,
  async (req, res) => {
    const { id } = req.params;
    const talkersArr = await talkers();
    saveTalker(talkersArr.filter((talk) => Number(talk.id) !== Number(id)));

    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
