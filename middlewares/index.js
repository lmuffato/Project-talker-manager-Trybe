const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

const crypto = require('crypto');

function generateToken() {
return crypto.randomBytes(8).toString('hex');
} 

const { readFile } = require('../services/readFile');

const { validateEmail, validatePassword } = require('../validations/validations');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await readFile();
  if (talkers.length === 0) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talkerId = talkers.findIndex(({ id: i }) => i === +id);
  if (talkerId === -1) {
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
}

  res.status(HTTP_OK_STATUS).json(talkers[talkerId]);
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = {
  app,
};
