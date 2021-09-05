const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fs = require('fs').promises;

const notFound = require('./notFound');

let TalkerNotFoundError;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getTalkers = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf8', (err, content) => {
    if (err) return [];
    return content;
  });
  return JSON.parse(talkers);
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/:id',
  rescue(async (req, res) => {
    const { id } = req.params;    
    const talker = await getTalkers().then((talkers) =>
      talkers.find((t) => t.id === Number(id)));
    if (!talker) {
      throw new Error();
    }
    res.status(HTTP_OK_STATUS).json(talker);
  }));

app.use(notFound);

app.get('/talker', async (_req, res) => {
  const talkers = await getTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});
