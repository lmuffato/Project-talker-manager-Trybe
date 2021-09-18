const express = require('express');
const bodyParser = require('body-parser');
const randomToken = require('random-token');
const http = require('./helper/httpStatus');
const login = require('./middlewares/validateLogin');
const talkerRouter = require('./middlewares/talkerRouter');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// Special Thanks to Adelino Junior T10-A, who helped me to solve the problem with the GET '/talker' endpoint and its logics

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(http.OK_STATUS).send();
});

app.post('/login', login.validateEmail, login.validatePassword, async (req, res) => {
  const token = randomToken(16);
  
  res.status(http.OK_STATUS).json({ token });
});

app.use('/talker', talkerRouter);

app.listen(PORT, () => {
  console.log('Online');
});
