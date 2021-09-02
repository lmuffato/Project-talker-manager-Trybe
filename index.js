const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;
// const talker = require('./routes/talker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
    const talker = await fs.readFile('./talker.json', 'utf8');
    const response = await JSON.parse(talker);
    res.status(200).json(response);
});

// app.use('/talker', talker);

app.listen(PORT, () => {
  console.log('Online');
});
