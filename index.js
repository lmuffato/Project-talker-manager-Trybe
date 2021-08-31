const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const readTalker = async () => {
  const talker = await fs.readFile('talker.json');
  return JSON.parse(talker);
};

app.get('/talker', async (_req, res) => {
  try {
    const talker = await readTalker();
    res.status(HTTP_OK_STATUS).json(talker);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
