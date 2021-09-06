const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./middlewares/routes');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const generateToken = require('./middlewares/generateToken');
// const checkAuth = require('./checkAuth');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.post('/login', validateEmail, validatePassword, async (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

app.use('/talker', routes);
