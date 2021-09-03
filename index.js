const express = require('express');
const bodyParser = require('body-parser');

const loginRouter = require('./router/loginRouter');
const talkerRouter = require('./router/talkerRouter');

const app = express();

app.use(bodyParser.json());

app.use('/talker', talkerRouter);
app.use('/login', loginRouter);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
