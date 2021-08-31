const readFile = require('../utils/readFile');

const getAllTalkers = async () => readFile('./talker.json');

module.exports = {
  async getTalkers(req, res) {
    try {
      const talkers = await getAllTalkers();
      res.status(200).json(talkers);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
};
