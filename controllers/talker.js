const readFile = require('../utils/readFile');

module.exports = {
  async getTalkers(req, res) {
    try {
      const talkers = await readFile('./talker.json');
      res.status(200).json(talkers);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
};
