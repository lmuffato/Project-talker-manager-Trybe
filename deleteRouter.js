const { Router } = require('express');
const fs = require('fs').promises;

const router = Router();

const findToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  next();
};

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

router.delete('/:id', findToken, checkToken, async (req, res) => {
  const { id } = req.params;
  const content = await fs.readFile('./talker.json');
  const talker = JSON.parse(content);
  const otherTalker = talker.filter((t) => t.id !== +id);
  await fs.writeFile('./talker.json', JSON.stringify(otherTalker));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;