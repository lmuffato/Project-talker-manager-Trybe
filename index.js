const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const Chance = require('chance');
const ValidateEmail = require('./validateEmail');
const ValidatePassword = require('./validatePassword');

const chance = new Chance();
const app = express();
app.use(bodyParser.json());

const HTTP_ERROR_STATUS = 404;
const HTTP_OK_STATUS = 200;

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  try {
    const content = await fs.readFile('./talker.json');
    const data = JSON.parse(content);
    res.status(HTTP_OK_STATUS).json(data);
  } catch (e) {
    res.status(HTTP_OK_STATUS).json([]);
  }
});

app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const content = await fs.readFile('./talker.json');
    const data = JSON.parse(content);
    const selectedId = data.filter((d) => d.id === parseInt(id, 10));
    
    if (!selectedId.length) {
      return res.status(HTTP_ERROR_STATUS).json(
        { message: 'Pessoa palestrante não encontrada' },
);
    }
    res.status(HTTP_OK_STATUS).json(...selectedId);
});

app.use(ValidateEmail);
app.use(ValidatePassword);

app.post('/login', (req, res) => {
  req.token = chance.string({ length: 16 });

  res.status(HTTP_OK_STATUS).json({ token: req.token });
});

app.listen(PORT, () => {
  console.log('Online');
});

// Utilizada a biblioteca Chance para gerar o token aleatório
// https://chancejs.com/basics/string.html