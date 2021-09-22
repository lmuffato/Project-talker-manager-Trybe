const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
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
    res.status(HTTP_NOT_FOUND_STATUS).json({ message: err.message });
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerList = await readTalkerFile();
  const talkerId = talkerList.find((talker) => talker.id === parseInt(id, 10)); // https://medium.com/@cristi.nord/javascript-parseint-c6b2a271f153 para o segundo parâmetro (radix)

  if (!talkerId) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talkerId);
});
