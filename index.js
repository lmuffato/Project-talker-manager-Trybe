const express = require('express');
const bodyParser = require('body-parser');

const talker = require('./routes/talker');
const login = require('./routes/login');

const { PORT, https } = require('./utils/infos');

const { HTTP_OK_STATUS } = https;

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talker);

app.use('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});
