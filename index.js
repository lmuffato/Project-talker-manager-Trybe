const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const routerLogin = require('./routerLogin');
const routerPostTalker = require('./postTalker');
const fileTalker = require('./fileTalker');
const putTalker = require('./putTalker');
const { validateToken } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requirement 07
app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const file = await fileTalker();
  if (!q || q === '') return res.status(200).json(file);
  const filtered = file.filter((elem) => elem.name.includes(q));
  if (filtered.length === 0) return res.status(200).json([]);
   res.status(200).json(filtered);
});

// Requirement 01
app.get('/talker', async (_req, res) => {
  try {
    const file = await fileTalker();
    res.status(200).json(file);
  } catch (e) {
    return res.status(200).json([]);
  }
});

// Requirement 02

app.get('/talker/:id', async (req, res) => {
   const { id } = req.params;
   const file = await fileTalker();
   const findById = file.find((elem) => elem.id === Number(id));
   if (!findById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
   res.status(200).json(findById); 
});

// Requirement 03
app.use('/login', routerLogin);

// Requirement 04
app.use('/talker', routerPostTalker);

// Requirement 05
app.use('/talker', putTalker);

// Requirement 06
app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const file = await fileTalker();
  const deleteFile = file.findIndex((elem) => elem.id === Number(id));
  file.splice(1, deleteFile);
   await fs.writeFile('talker.json', JSON.stringify(file));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
