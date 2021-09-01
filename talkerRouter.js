const { Router } = require('express');
const fs = require('fs').promises;
const router = Router();

const HTTP_OK_STATUS = 200;
const talkers = './talker.json';

const readFile = () => fs.readFile(talkers, 'utf8')
  .then((data) => JSON.parse(data));

router.get('/', async (_req, res) => {
  const talkersList = await readFile();
  return res.status(HTTP_OK_STATUS).json(talkersList);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile();
  const foundTalker = talkersList.find((talker) => talker.id === parseInt(id, 0));

  if (!foundTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).send(foundTalker);
});

module.exports = router;