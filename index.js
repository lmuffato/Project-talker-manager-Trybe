const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = require('./loginRouter');
const talkerRouter = require('./talkerRouter');

const app = express();
app.use(bodyParser.json());
const PORT = '3000';
const HTTP_OK_STATUS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.use('/talker', talkerRouter);

app.use('/login', loginRouter);
