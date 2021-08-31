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
};
