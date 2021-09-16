const express = require('express');
const bodyParser = require('body-parser');
const loginPost = require('./routes/login');
const talkerFunc = require('./routes/talker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login', loginPost);
app.use('/talker', talkerFunc);

app.listen(PORT, () => {
  console.log('Online');
});
