const express = require('express');
const { readFile, writeFile } = require('fs').promises;
const authMiddlewares = require('./middlewares');

const TALKER_JSON = 'talker.json';

const router = express.Router();
const [validateToken] = authMiddlewares;

const getFileData = async (file) => {
  const data = await readFile(file, 'utf-8');
  const results = JSON.parse(data);
  return results;
};

router.get('/', async (_req, res) => {
  try {
    const talkers = await getFileData(TALKER_JSON);
    res.status(200).json(talkers);
  } catch (error) {
    res.status(200).json([]);
  }  
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  try {
    const talkers = await getFileData(TALKER_JSON);
    if (!q) return res.status(200).json(talkers);
    const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));
    res.status(200).json(filteredTalkers);
  } catch (error) {
    res.status(500).end();
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talkers = await getFileData(TALKER_JSON);
    const talker = talkers.find((person) => person.id === parseInt(id, 10));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talker);
  } catch (error) {
    res.status(500).end();
  }
});

router.post('/', authMiddlewares, async (req, res) => {
  const { name, age, talk } = req.body;

  try {
    const talkers = await getFileData(TALKER_JSON);
    const newTalker = { name, age, talk, id: (talkers.length + 1) };
    await writeFile(TALKER_JSON, JSON.stringify([...talkers, newTalker]));
    res.status(201).json(newTalker);
  } catch (error) {
    res.status(500).end();
  }  
});

router.put('/:id', authMiddlewares, async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;

  try {
    const talkers = await getFileData(TALKER_JSON);
    const newTalker = { name, age, talk, id: parseInt(id, 10) };
    const filteredTalkers = talkers.filter((person) => person.id !== parseInt(id, 10));
    await writeFile(TALKER_JSON, JSON.stringify([...filteredTalkers, newTalker]));
    res.status(200).json(newTalker);
  } catch (error) {
    res.status(500).end();
  }  
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const talkers = await getFileData(TALKER_JSON);
    const newTalkers = talkers.filter((talker) => talker.id !== parseInt(id, 10));
    await writeFile(TALKER_JSON, JSON.stringify(newTalkers), 'utf-8');
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    res.status(500).end();
  }
});

module.exports = router;
