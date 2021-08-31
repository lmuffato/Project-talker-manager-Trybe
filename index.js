const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const {
  getTalkerFile,
} = require('./fsFunctions');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue(async (_req, res) => {
  const talkerFile = await getTalkerFile();
  if (talkerFile.length === 0) res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(talkerFile);
}));

app.listen(PORT, () => {
  console.log('Online');
});
