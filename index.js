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

app.get('/talker', async (req, res, next) => {
  try {
    const content = await fs.readFile('./talker.json');
    const talkers = JSON.parse(content);
    res.status(200).json(talkers);
  } catch (e) {
    console.log('Tratamento no middleware específico');
    next(e.message);
  }
});

app.use((err, _req, res, _next) => {
  console.log('Passou pelo middleware');
  res.status(400).json({ message: err });
});

app.listen(PORT, () => {
  console.log('Online');
});
