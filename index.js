const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('express');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talker = 'talker.json';
const talkers = fs.readFileSync(talker, 'utf8'); // Leitura de um arquivo
const talkerJson = JSON.parse(talkers); // analisa uma string JSON, construindo um objeto JavaScript descrito pela string

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (request, response) => {  
  response.status(HTTP_OK_STATUS).json(talkerJson);
});

app.listen(PORT, () => {
  console.log('Online');
});
