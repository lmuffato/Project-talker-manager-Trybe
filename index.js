const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const emailValidation = require('./middleware/emailValidation');
const passwordlValidation = require('./middleware/passwordValidation');
const tokenGeneration = require('./middleware/tokenGeneration');

const readFile = async () => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const talkers = await JSON.parse(data);
  return talkers;
};

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await readFile();
  return res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const findTalker = talkers.find((talker) => talker.id === Number(id));

  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(findTalker);
});

app.post('/login', emailValidation, passwordlValidation, tokenGeneration);

app.listen(PORT, () => {
  console.log('Online');
});
