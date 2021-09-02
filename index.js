const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const { validateToken, validateEmail, validatePassword } = require('./validation.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// requisito 1
app.get('/talker', async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf8');

  const talker = JSON.parse(data);
  console.log(talker);

  res.status(HTTP_OK_STATUS).json(talker);
});

// requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params.id;
  
  const data = await fs.readFile('./talker.json', 'utf8');
  const dataId = data.find((item) => item.id === Number(id));

  if (!dataId) {
    return res.status(404).json({ message: 'Book not found!' });
  }

  res.status(HTTP_OK_STATUS).json(dataId);
});

// requisito 3
app.post('/login', validateToken, validateEmail, validatePassword, (req, res) => {
  
});

// requisito 4
app.post('/login', validateToken, validateEmail, validatePassword, (req, res) => {
  
});






// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
