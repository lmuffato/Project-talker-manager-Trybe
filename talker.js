const express = require('express');
const fs = require('fs').promises;
const midd = require('./middleware');

const router = express.Router();

const fileData = async (path) => {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  };

router.get('/', async (_req, res) => {
    try {
        const data = await fs.readFile('./talker.json', 'utf-8');
        // console.log(JSON.parse(data));
        return res.status(200).json(JSON.parse(data));
    } catch (error) {
        return res.status(200).json([]);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const data = await fileData('./talker.json');
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
      const talkers = await fileData('./talker.json');
      const newTalker = { name, age, talk, id: (talkers.length + 1) };
      await fs.writeFile('./talker.json', JSON.stringify([...talkers, newTalker]));
      res.status(201).json(newTalker);
    } catch (error) {
      res.status(500).end();
    }  
  });

module.exports = router;