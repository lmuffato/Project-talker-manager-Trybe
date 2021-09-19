const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth');
const talkerRouter = require('./talkerRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);

app.use('/login', auth);

app.listen(PORT, () => {
  console.log('Online');
});
