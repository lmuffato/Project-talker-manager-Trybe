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

app.get('/talker', async (_request, response) => {
  const talker = await fs.readFile('./talker.json', 'utf8');
  const result = await JSON.parse(talker);
  response.status(200).json(result);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talker = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talker);
  const pessoasPalestrantes = result.find((obj) => obj.id === parseInt(id, 0));
  if (!pessoasPalestrantes) {
    return response.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  response.status(200).json(pessoasPalestrantes);
});

app.listen(PORT, () => {
  console.log('Online');
});
