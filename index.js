const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const talkerController = require('./controllers/talkerController')

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', talkerController.getAll);
app.get('/talker/:id', talkerController.getById);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
