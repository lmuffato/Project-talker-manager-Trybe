const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// getTalkerById
app.get(
  '/talker/:id',
  (request, response) => {
    const { id } = request.params;
    const data = fs.readFileSync('./talker.json', { encoding: 'utf-8' });
    const jsonData = JSON.parse(data);
    const talker = jsonData.find((person) => +id === person.id);
    console.log(talker);
    if (!talker) {
      return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    response.status(200).json(talker);
  },
);

// getAllTalkers
app.get('/talker', (_request, response) => {
  const data = fs.readFileSync('./talker.json', { encoding: 'utf-8' });
  const jsonData = JSON.parse(data);
  response.status(200).json(jsonData);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
