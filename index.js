const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  fs.readFile('talker.json', 'utf8', (err, data) => {
    if (err) {
      console.error(`Não foi possível ler o arquivo ${'talker.json'}\n Erro: ${err}`);
      response.status(400).send();
      process.exit(1);
    }
    response.status(HTTP_OK_STATUS).send(data);
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
