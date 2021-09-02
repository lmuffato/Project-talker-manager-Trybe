const fs = require('fs').promises;
const readFile = require('../utils/readFile');

const getAllTalkers = async () => readFile('./talker.json');

module.exports = {
  async getTalkers(req, res) {
    try {
      const talkers = await getAllTalkers();
      res.status(200).json(talkers);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getTalker(req, res) {
    try {
      const { id } = req.params;
      const talkers = await getAllTalkers();
      const talker = talkers.find((person) => person.id === Number(id));
      if (!talker) throw new Error('Pessoa palestrante não encontrada');
      res.status(200).json(talker);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  async postTalker(req, res) {
    try {
      let highestId = 0;
      const talkers = await getAllTalkers();
      talkers.forEach((talker) => {
        if (talker.id > highestId) highestId = talker.id;
      });
      const id = highestId + 1;
      const talker = {
        ...req.body,
        id,
      };
      talkers.push(talker);
      await fs.writeFile('./talker.json', JSON.stringify(talkers));
      res.status(201).json(talker);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
