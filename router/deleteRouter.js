const { Router } = require('express');
const fs = require('fs').promises;

const router = Router();

const functions = require('./functions');

const { findToken,
  checkToken } = functions;

router.delete('/:id', findToken, checkToken, async (req, res) => {
  const { id } = req.params;
  const content = await fs.readFile('./talker.json');
  const talker = JSON.parse(content);
  const otherTalker = talker.filter((t) => t.id !== +id);
  await fs.writeFile('./talker.json', JSON.stringify(otherTalker));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;