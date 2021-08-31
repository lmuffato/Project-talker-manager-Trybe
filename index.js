const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const rescue = require('express-rescue');

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

// Requisito 1 :Crie o endpoint GET /talker

function getJSONTalkers() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((readFileTalkers) => JSON.parse(readFileTalkers));
}

app.get('/talker', rescue(async (req, res) => {
    const talkers = await getJSONTalkers();

    res.status(HTTP_OK_STATUS).json(talkers);
}));