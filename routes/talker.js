const express = require('express');
const fs = require('fs').promises;
const { tokenVerifier, nameVerifier, ageVerifier, rateVerifier,
  watchVerifier } = require('../middlewares/talkerValidation');
// const talkerInfo = require('../talker.json');

const TALKERFILE = './talker.json';
const router = express.Router();
const validation = [tokenVerifier, nameVerifier, ageVerifier, rateVerifier,
watchVerifier];
const HTTP_CREATED = 201;
const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;

const talkers = async () => {
  const info = await fs.readFile(TALKERFILE, 'utf-8');
  const talkersInfo = await JSON.parse(info);
  return talkersInfo;
};

router.get('/', async (_req, res) => {
  const talkerInfo = await talkers();
  if (!talkerInfo) {
    return res.status(HTTP_OK_STATUS).json([]); 
  }
  return res.status(HTTP_OK_STATUS).json(talkerInfo);
});

router.post('/', validation, async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = await talkers();
  const newTalker = {
    id: talker.length + 1,
    name,
    age,
    talk,
  };
  talker.push(newTalker);
  await fs.writeFile(TALKERFILE, JSON.stringify(talker), (error) => { if (error) throw error; });
  return res.status(HTTP_CREATED).json(newTalker).end();
});

router.delete('/:id', tokenVerifier, async (req, res) => {
  const { id } = req.params;
  const talkerInfo = await talkers();
  const index = talkerInfo.findIndex((talker) => talker.id === +id);
  if (index === -1) return res.status(HTTP_NOT_FOUND).json({ message: '\'id not found\'' });
  talkerInfo.splice(index, 1);
  await fs.writeFile(TALKERFILE, 
    JSON.stringify(talkerInfo), (error) => { if (error) throw error; });
  return res.status(HTTP_OK_STATUS).end();
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkerInfo = await talkers();
  const talkerFind = talkerInfo.find((talker) => talker.id === +id);
  if (!talkerFind) {
 return res.status(HTTP_NOT_FOUND)
  .json({ message: 'Pessoa palestrante não encontrada' }); 
}
   return res.status(HTTP_OK_STATUS).json(talkerFind);
  });

module.exports = router;