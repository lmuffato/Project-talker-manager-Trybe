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

app.get('/talker', async (req, res) => {
  const readed = await fs.readFile('./talker', 'utf-8');
  
  if (readed.length === 0) return res.status(200).json([]);

  res.status(HTTP_OK_STATUS).json(readed);
});

app.listen(PORT, () => {
  console.log('Online');
});
