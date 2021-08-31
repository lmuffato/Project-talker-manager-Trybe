const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const generateToken = require('./utils/helpers');
const { 
  isValidEmail, 
  isValidPassword,

  isValidToken,
  isValidName,
  isValidAge,

  isValidTalk,
  isValidDate,
  isValidRate,
} = require('./middlewares/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const readTalker = async () => {
  const talker = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talker);
  return result;
};

app.get('/talker', async (_req, res) => {
  const talker = await readTalker();
  res.status(200).json(talker);
});

app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talker = await readTalker();
    const speaker = talker.find((obj) => obj.id === parseInt(id, 0));
    if (!speaker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(speaker);
});

app.post('/login', isValidEmail, isValidPassword, (_req, res) => {
  res.status(200).json({ token: generateToken(16) });
});

app.post(
  '/talker',
  isValidToken,
  isValidName,
  isValidAge,

  isValidTalk,
  isValidDate,
  isValidRate,
  async (req, res) => {
      const { name, age, talk } = req.body;
      const talker = await readTalker();
      const id = talker.length + 1;
      const { watchedAt, rate } = talk;
      const obj = {
        name, 
        age,
        id,
        talk: { watchedAt, rate },
      };
      talker.push(obj);
      await fs.writeFile('talker.json', JSON.stringify(talker));
      res.status(201).json(obj);
  },
);

app.put(
  '/talker/:id',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidDate,
  isValidRate,
  async (req, res) => {
    const { id } = req.params;
    const talker = await readTalker();
    const speaker = talker.find((obj) => obj.id === parseInt(id, 0));
    const filteredSpeakers = talker.filter((obj) => obj.id !== id);
    const editedSpeaker = { ...speaker, ...req.body };
    filteredSpeakers.push(editedSpeaker);
    await fs.writeFile('talker.json', JSON.stringify(filteredSpeakers));
    res.status(200).json(editedSpeaker);
  },
);
