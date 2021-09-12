const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.get('/talker', (_request, response) => {
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  try {
    response.status(HTTP_OK_STATUS).json(data);
  } catch (error) {
    response.status(HTTP_OK_STATUS).json([]);
  }

/*   if (data === []) {
    response.status(HTTP_OK_STATUS).json([]);
  }response.status(HTTP_OK_STATUS).json(data); */
});

// Requisito 2

app.get('/talker/:id', (request, response) => {
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const { id } = request.params;
  const talkerId = data.find((talker) => talker.id === Number(id));
   const messageError = { message: 'Pessoa palestrante não encontrada' };
  
  return talkerId
  ? response.status(HTTP_OK_STATUS).json(talkerId)
  : response.status(HTTP_NOT_FOUND).json(messageError);
});

app.listen(PORT, () => {
  console.log('Online');
});