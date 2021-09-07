const express = require('express');
const fs = require('fs').promises;
const midd = require('./middleware');

const router = express.Router();
const TALKERPATH = './talker.json';
const fileData = async (path) => {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  };

router.get('/', async (_req, res) => {
    try {
        const data = await fs.readFile(TALKERPATH, 'utf-8');
        // console.log(JSON.parse(data));
        return res.status(200).json(JSON.parse(data));
    } catch (error) {
        return res.status(200).json([]);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const data = await fileData(TALKERPATH);
      const talker = data.find((response) => response.id === parseInt(id, 10));
      
      if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      return res.status(200).json(talker);
    } catch (error) {
      return res.status(500).end();
    }
  });

  router.post('/', 
  midd.tokenValidate,
  midd.nameValidate,
  midd.ageValidate,
  midd.talkValidate,
  midd.fieldValidate,
   async (req, res) => {
    const { name, age, talk } = req.body;
  
    try {
      const talkers = await fileData(TALKERPATH);
      const newTalker = { name, age, talk, id: (talkers.length + 1) };
      await fs.writeFile(TALKERPATH, JSON.stringify([...talkers, newTalker]));
      res.status(201).json(newTalker);
    } catch (error) {
      res.status(500).end();
    }  
  });

  router.put('/:id',
  midd.tokenValidate,
  midd.nameValidate,
  midd.ageValidate,
  midd.talkValidate,
  midd.fieldValidate,
   async (req, res) => {
    const { name, age, talk } = req.body;
    const { id } = req.params;
  
    try {
      const talkers = await fileData(TALKERPATH);
      const newTalker = { name, age, talk, id: parseInt(id, 10) };
      const filteredTalkers = talkers.filter((response) => response.id !== parseInt(id, 10));
      await fs.writeFile(TALKERPATH, JSON.stringify([...filteredTalkers, newTalker]));
      res.status(200).json(newTalker);
    } catch (error) {
      res.status(500).end();
    }  
  });

  router.delete('/:id', midd.tokenValidate, async (req, res) => {
    const { id } = req.params;
    try {
      const talkers = await fileData(TALKERPATH);
      const newTalkers = talkers.filter((response) => response.id !== parseInt(id, 10));
      await fs.writeFile(TALKERPATH, JSON.stringify(newTalkers), 'utf-8');
      res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
    } catch (error) {
      res.status(500).end();
    }
  });

module.exports = router;