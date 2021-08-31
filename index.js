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

app.get('/talker', async (_req, res) => {
    const talkers = await fs.readFile('./talker.json', 'utf-8');
    const formatedTalkers = await JSON.parse(talkers);
    if (!formatedTalkers) return res.status(HTTP_OK_STATUS).json([]);
    res.status(HTTP_OK_STATUS).json(formatedTalkers);
});

// fonte para o entendimento do JSON.parse: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const formatedTalkers = await JSON.parse(talkers);
  const chosedTalker = await formatedTalkers.find((talker) => talker.id === parseInt(id, 10));

  if (!chosedTalker) {
    return res.status(HTTP_NOT_FOUND_STATUS)
    .json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  res.status(HTTP_OK_STATUS).json(chosedTalker);
});