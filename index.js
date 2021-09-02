const express = require('express');
const bodyParser = require('body-parser');
const { readFile } = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Quesito 01

const reading = async (file) => {
  let readfile = await readFile(file);
  readfile = JSON.parse(readfile);

  return readfile;
};

app.get('/talker', async (_req, res) => {
  try {
    const talker = await reading('talker.json');
    if (!talker) return res.status(HTTP_OK_STATUS).send([]);
    res.status(HTTP_OK_STATUS).send(talker);
  } catch (_e) {
    return null;
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
