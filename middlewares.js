const fs = require('fs').promises;
const crypto = require('crypto');

const talkerPath = './talker.json';

const loginToken = crypto.randomBytes(8).toString('hex');

module.exports = {
  getTalkersMiddleware: async (_req, res) => {
    try {
      const file = await fs.readFile(talkerPath, 'utf-8');
  
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
      const file = await fs.readFile(talkerPath, 'utf-8');
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

  getTalkersBySearch: async (req, res) => {
    const { q } = req.query;
    const file = await fs.readFile(talkerPath, 'utf-8');
    const parsed = JSON.parse(file);

    if (!q || q === '') {
      return res.status(200).send(parsed);
    }

    const filteredTalkers = parsed.filter((talker) => talker.name.includes(q));

    if (!filteredTalkers) {
      return res.status(200).send([]);
    }

    res.status(200).send(filteredTalkers);
  },

  postTalkerMiddleware: async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const data = await fs.readFile(talkerPath, 'utf-8');
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

  putTalkersMiddleware: async (req, res) => {
    const { talkerId } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const data = await fs.readFile(talkerPath, 'utf-8');
    const parsed = JSON.parse(data);

    const talkerToEdit = parsed.findIndex((talker) => talker.id === parseInt(talkerId, 10));

    parsed[talkerToEdit] = { ...parsed[talkerToEdit], name, age, talk: { watchedAt, rate } };
    
    await fs.writeFile('./talker.json', JSON.stringify(parsed));
    res.status(200).send(parsed[talkerToEdit]);
  },

  deleteTalkersMiddleware: async (req, res) => {
    const { talkerId } = req.params;
    const data = await fs.readFile(talkerPath, 'utf-8');
    const parsed = JSON.parse(data);

    const talkerToDelete = parsed.findIndex((talker) => talker.id === parseInt(talkerId, 10));

    parsed.splice(talkerToDelete, 1);
    await fs.writeFile(talkerPath, JSON.stringify(parsed));
    res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
  },

  getLoginToken: (_req, res) => {
    res.status(200).send({ token: loginToken });
  },
};