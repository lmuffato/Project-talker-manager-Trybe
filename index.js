const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// Req 1
app.get('/talker', (_req, res) => {
  const talker = JSON.parse(fs.readFileSync('./talker.json'));
  if (talker.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  } 
    return res.status(HTTP_OK_STATUS).json(talker);
});

// Req 2 
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync('./talker.json'));
  const findTalker = talker.find((talk) => talk.id === +(id));
  if (!findTalker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(HTTP_OK_STATUS).json(findTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
