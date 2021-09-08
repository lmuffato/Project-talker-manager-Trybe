const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const data = require('./talker.json');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  if (!data) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).send(data);
});

app.listen(PORT, () => {
  console.log('Online');
});
