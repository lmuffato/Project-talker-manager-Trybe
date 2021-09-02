const { Router } = require('express');
const fs = require('fs').promises;
const {
  isValidName,
  isValidToken,
  isValidAge,
  isValidTalk,
  isValidDate,
  isValidRate,
} = require('../Validations/validations');

const router = Router();

const getFile = async () => {
  const respose = await fs.readFile('talker.json', 'utf-8');
  const data = JSON.parse(respose);
  return data;
};

const createTalker = async (body) => {
  const { name, age, talk, id } = body;
  const data = await getFile();
  const newTalker = {
    name,
    age,
    id,
    talk,
  };
  data.push(newTalker);
  fs.writeFile('talker.json', JSON.stringify(data));
  return newTalker;
};

router.get('/', async (_req, res) => {
  try {
    const data = await getFile();
    res.status(200).json(data);
  } catch (e) {
    console.error(`Erro: ${e}`);
  }
});

router.get('/search', isValidToken, async (req, res) => {
  try {
    const { q } = req.query;
    const data = await getFile();
    const filterTalker = data.filter((t) => t.name.includes(q));
    res.status(200).json(filterTalker);
  } catch (e) {
    console.log(`Erro - Req 7 ${e}`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getFile();
    const talker = data.find((t) => t.id === parseInt(id, 0));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talker);
  } catch (e) {
    console.error(`Erro Req 2: ${e}`);
  }
});

const validations = [isValidToken, isValidName, isValidAge, isValidTalk, isValidDate, isValidRate];

router.post('/', validations, async (req, res) => {
  try {
    const { name, age, talk } = req.body;
    const data = await getFile();
    const id = data.length + 1;
    const newTalker = {
      name,
      age,
      id,
      talk,
    };
    createTalker(newTalker);
    res.status(201).json(newTalker);
  } catch (e) {
    console.log(`Erro req 4: ${e}`);
  }
});

router.put('/:id', validations, async (req, res) => {
  try {
    const { name, age, talk } = req.body;
    const { id } = req.params;
    const data = await getFile();
    const talker = data.find((t) => t.id === parseInt(id, 0));
    const newTalker = {
      ...talker,
      name,
      age,
      talk,
    };
    data.splice(talker, 1, newTalker);
    fs.writeFile('talker.json', JSON.stringify(data));
    const showtalker = data.find((t) => t.id === parseInt(id, 0));
    res.status(200).json(showtalker);
  } catch (e) {
    console.error(`Erro Req 5: ${e}`);
  }
});

router.delete('/:id', isValidToken, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getFile();
    const newData = data.filter((t) => t.id !== parseInt(id, 0));
    fs.writeFile('talker.json', JSON.stringify(newData));
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (e) {
    console.error(`Erro Req 6: ${e}`);
  }
});

module.exports = router;