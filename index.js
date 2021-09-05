const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const talker = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const FILEPATH = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  fs.readFile(FILEPATH, (error, data) => {
    if (error) {
      return res.status(HTTP_OK_STATUS).send([]);
    }
    const TALKER = JSON.parse(data);
    return res.status(HTTP_OK_STATUS).send(TALKER);
  });
});

// Resolvi fazer a anterior com readFile e essa importando o arquivo, 
// apenas para mostrar que é possível das duas maneiras
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkerById = talker.find((t) => t.id === parseInt(id, 8));

  if (!talkerById) {
 return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  }); 
}

  res.status(200).json(talkerById);
});

app.listen(PORT, () => {
  console.log('Online');
});
