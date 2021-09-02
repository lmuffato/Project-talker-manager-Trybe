const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
// const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
   
app.listen(PORT, () => {
  console.log('Online');
});

const loginRouter = require('./loginRouter');

app.use('/login', loginRouter);

const talkerRouter = require('./talkerRouter');

app.use('/talker', talkerRouter);
