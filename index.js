const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
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
    res.status(NOT_FOUND).json({ message: e.message });
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
    const talker = await readTalker();
    // https://www.w3schools.com/jsref/jsref_parseint.asp considerando decimal
    const talkerById = talker.find((t) => t.id === +id);
    if (talkerById === undefined) { 
      return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' }); 
    }
    res.status(HTTP_OK_STATUS).json(talkerById);
});
