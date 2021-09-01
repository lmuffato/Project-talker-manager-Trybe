const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs');
const routerTalker = require('./routes/talker');
const { validateEmail, validatePassword, getToken } = require('./middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());
app.use('/talker', routerTalker);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.post('/login', validateEmail, validatePassword, getToken, (request, response) => {
  const { token } = request;
  response.status(HTTP_OK_STATUS).json({ token });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
