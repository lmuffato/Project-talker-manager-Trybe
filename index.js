const express = require('express');

const bodyParser = require('body-parser');

const fs = require('fs');

const app = express();

app.use(bodyParser.json());

// const routes = require('./routes')(app, fs);

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TALKER = './talker.json';

app.get('/talker', (_request, response) => {
  fs.readFile(TALKER, 'utf8', (e, content) => {
      if (e) {
          throw e;
      }
      response.send(JSON.parse(content));
  });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
