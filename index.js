const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talkerData = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_rej, res) => {
  try {
    return res.status(200).send(talkerData);
  } catch (error) {
    return res.status(200).send({ error });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
