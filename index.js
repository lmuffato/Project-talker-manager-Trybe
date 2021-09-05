const express = require('express');
const bodyParser = require('body-parser');

// const Router = require('./routes');
const error = require('./middlewares/error');
// const talkerRouter = require('./routes/talkerRouter');

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

app.use(error);

app.listen(PORT, () => {
  console.log('Online');
});
