const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const { getAllTalkers, writeTalker } = require('./fsFunctions');
const { createToken, validateEmail, validatePassword } = require('./middlewares/middlewaresLogin');
const {
  verifyToken,
  validateName,
  validateAge,
  validateTalkDate,
  validateRate,
  validateTalk,
} = require('./middlewares/middlewaresTalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get(
  '/talker',
  rescue(async (_req, res) => {
    const fileTalkers = await getAllTalkers();
    if (fileTalkers.length === 0) return res.status(HTTP_OK_STATUS).json([]);
    res.status(HTTP_OK_STATUS).json(fileTalkers);
  }),
);

app.get(
  '/talker/search',
  verifyToken,
  rescue(async (req, res) => {
    const { q } = req.query;
    const fileTalkers = await getAllTalkers();
    
    const filteredTalkers = fileTalkers.filter((talker) => talker.name.includes(q));
    
    if (!q || q === '') return res.status().json([]);
    
    if (!filteredTalkers) return res.status().json(fileTalkers);
  
    res.status(HTTP_OK_STATUS).json(filteredTalkers);
  }),
);

app.get(
  '/talker/:id',
  rescue(async (req, res) => {
    const fileTalkers = await getAllTalkers();
    const { id } = req.params;
    const talker = fileTalkers.find((t) => t.id === parseInt(id, 10));
    
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    res.status(HTTP_OK_STATUS).json(talker);
  }),
);

app.post('/login', createToken, validateEmail, validatePassword, (req, res) => {
  const { token } = req;
  res.status(HTTP_OK_STATUS).json({ token });
});

app.post(
  '/talker',
  verifyToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkDate,
  validateRate,
  rescue(async (req, res) => {
    const { name, age, talk } = req.body;
    const fileTalkers = await getAllTalkers();

    const id = parseInt(fileTalkers[fileTalkers.length - 1].id + 1, 10);

    fileTalkers.push({ name, age, id, talk });

    writeTalker(fileTalkers);

    res.status(HTTP_CREATED_STATUS).json({ name, age, id, talk });
  }),
);

app.delete(
  '/talker/:id',
  verifyToken,
  rescue(async (req, res) => {
    const fileTalkers = await getAllTalkers();
    const { id } = req.params;
    const deletedTalker = fileTalkers.findIndex((t) => t.id === parseInt(id, 10));

    fileTalkers.splice(deletedTalker, 1);

    writeTalker(fileTalkers);

    res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
  }),
);

app.listen(PORT, () => {
  console.log('Online');
});
