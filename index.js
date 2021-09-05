const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { response } = require('express');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const FILEPATH = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  fs.readFile(FILEPATH, (error, data) => {
    if (error) {
      return res.status(HTTP_OK_STATUS).send([]);
    }
    const TALKER = JSON.parse(data);
    return res.status(HTTP_OK_STATUS).send(TALKER);
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
