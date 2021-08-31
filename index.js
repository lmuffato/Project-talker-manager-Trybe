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

app.get('/talker', async (_req, res) => {
  try {
    const content = await fs.readFile('./talker.json');
    const data = JSON.parse(content);
    res.status(HTTP_OK_STATUS).json(data);
  } catch (e) {
    res.status(HTTP_OK_STATUS).json([]);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
