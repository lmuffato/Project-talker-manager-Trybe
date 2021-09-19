const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await fs.readFile('talker.json', 'utf-8');
  const fetchData = await JSON.parse(data);

  res.status(HTTP_OK_STATUS).json(fetchData);
});

app.get('/talker/:id', (_req, res) => {
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const { id } = _req.params;
  const idTalker = data.find((talker) => talker.id === Number(id));
  const errorMessage = {
    message: 'Pessoa palestrante não encontrada',
  };

  return idTalker 
  ? res.status(HTTP_OK_STATUS).json(idTalker) 
  : res.status(HTTP_NOT_FOUND).json(errorMessage);
});

app.listen(PORT, () => {
  console.log('Online');
});
