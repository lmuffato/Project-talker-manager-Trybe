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

// Requirement 01
app.get('/talker', async (_req, res) => {
  try {
    const file = await fs.readFile('talker.json');
    const arrayOfObejct = JSON.parse(file);
    res.status(200).json(arrayOfObejct);
  } catch (err) {
    return res.status(200).json([]);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
