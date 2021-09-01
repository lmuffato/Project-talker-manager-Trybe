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

const fileTalker = async () => {
  const file = await fs.readFile('talker.json');
  const arrayOfObejct = JSON.parse(file);
  return arrayOfObejct;
};

// Requirement 01
app.get('/talker', async (_req, res) => {
  try {
    const file = await fileTalker();
    res.status(200).json(file);
  } catch (e) {
    return res.status(200).json([]);
  }
});

// Requirement 02

app.listen(PORT, () => {
  console.log('Online');
});
