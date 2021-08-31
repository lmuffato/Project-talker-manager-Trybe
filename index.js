const express = require('express');
const bodyParser = require('body-parser');
const { generateToken } = require('./utils/helpers');
const { 
  isValidEmail, 
  isValidPassword,
} = require('./middlewares/validations');
const talkerRouter = require('./routers/talkerRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.use('/talker', talkerRouter);

app.post('/login', isValidEmail, isValidPassword, (_req, res) => {
  res.status(200).json({ token: generateToken(16) });
});
