const fs = require('fs').promises;
const crypto = require('crypto');

const loginToken = crypto.randomBytes(8).toString('hex');

module.exports = {
  getTalkersMiddleware: async (_req, res) => {
    try {
      const file = await fs.readFile('./talker.json', 'utf-8');
  
      if (!file) {
        return res.status(200).json(JSON.parse([]));
      }

      res.status(200).json(JSON.parse(file));
    } catch (error) {
      res.status(400).json(error);
    }
  },

  getTalkerByIdMiddleware: async (req, res) => {
    try {
      const { talkerId } = req.params;
      const file = await fs.readFile('./talker.json', 'utf-8');
      const parsedFile = JSON.parse(file);
      const talkerById = [...parsedFile]
        .find((talker) => talker.id === parseInt(talkerId, 10));
      if (!talkerById) {
        return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
      }

      res.status(200).json(talkerById);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  postTalkerMiddleware: async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const data = await fs.readFile('./talker.json', 'utf-8');
    const parsed = JSON.parse(data);
    const talkerToAdd = {
      name,
      age,
      id: parsed.length + 1,
      talk: {
        watchedAt,
        rate,
      },
    };
    parsed.push(talkerToAdd);

    await fs.writeFile('./talker.json', JSON.stringify(parsed));
    res.status(201).send(talkerToAdd);
  },

  getLoginToken: (_req, res) => {
    res.status(200).send({ token: loginToken });
  },
};
