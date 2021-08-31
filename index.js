const express = require('express');
const bodyParser = require('body-parser');
const getAllTalkers = require('./middleware/req1');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(getAllTalkers);

// requisito 1
app.get('/talker', getAllTalkers);

// requisito 2

// requisito 3

// Erros

// app.use((err, _req, res, _next) => {
//   res.status(500).json({ error: `Erro: ${err.message}` });
// });

app.listen(PORT, () => {
  console.log('Online');
});