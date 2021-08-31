const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const { getAllTalkers } = require('./fsFunctions');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get(
  '/talker',
  rescue(async (_req, res) => {
    const fileTalkers = await getAllTalkers();
    if (fileTalkers.length === 0) return res.status(HTTP_OK_STATUS).json([]);
    res.status(HTTP_OK_STATUS).json(fileTalkers);
  }),
);

app.listen(PORT, () => {
  console.log('Online');
});
