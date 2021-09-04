const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { generateToken, getTalkers, getTalkerById } = require('./middlewares/talker');
const {
  validateToken,
  validateNameAndAge,
  validateTalker,
  validateTalkerInfos,
} = require('./middlewares/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  try {
    const talkers = getTalkers();
    res.status(200).send(talkers);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/talker/search', validateToken, (req, res, next) => {
  try {
    const talkers = getTalkers();
    const query = req.query.q.toLocaleLowerCase();
    if (!query) return next();
    const filteredTalkers = talkers.filter((talker) => 
      talker.name.toLocaleLowerCase().includes(query));
    return res.status(200).json(filteredTalkers);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getTalkerId = await getTalkerById(id);
    if (!getTalkerId) {
      res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    return res.status(200).json(getTalkerId);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.post('/login', (req, res) => {
  const PASSWORD_LENGTH = 6;
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!email.match(/(.+@.+\.com)(\.br)?/)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < PASSWORD_LENGTH) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = generateToken();
  res.status(200).json({ token });
});

app.post(
  '/talker',
  validateToken,
  validateNameAndAge,
  validateTalker,
  validateTalkerInfos,
  (req, res) => {
    try {
      const talkers = getTalkers();
      const newTalker = req.body;
      newTalker.id = talkers.length + 1;
      talkers.push(newTalker);
      fs.writeFileSync('talker.json', JSON.stringify(talkers));
      res.status(201).json(newTalker);
    } catch (err) {
      return res.status(500).send({ err });
    }
  },
);

app.put(
  '/talker/:id',
  validateToken,
  validateNameAndAge,
  validateTalker,
  validateTalkerInfos,
  (req, res) => {
    try {
      const talkers = getTalkers();
      const data = req.body;
      const { id } = req.params;
      console.log(id);
      const talkerId = parseInt(id, 10);
      data.id = talkerId;
      const updatedTalkers = talkers.map((talker) => {
        if (talker.id === talkerId) {
          return { ...data };
        }
        return talker;
      });
      fs.writeFileSync('talker.json', JSON.stringify(updatedTalkers));
      res.status(200).json(data);
    } catch (err) {
      return res.status(500).send({ err });
    }
  },
);

app.delete('/talker/:id', validateToken, (req, res) => {
  try {
    const talkers = getTalkers();
    const { id } = req.params;
    const talkerIdDeleted = parseInt(id, 10);
    const updatedTalkers = talkers.filter((talker) => talker.id !== talkerIdDeleted);
    fs.writeFileSync('talker.json', JSON.stringify(updatedTalkers));
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
