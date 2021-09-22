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

const readTalkerFile = async () => { // function para ler o arquivo talker.json
  const talkerList = await fs.readFile('talker.json');
  return JSON.parse(talkerList); // parse para converter json em string
};

app.get('/talker', async (_req, res) => {
  try {
    const talkerList = await readTalkerFile();
    res.status(HTTP_OK_STATUS).json(talkerList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
