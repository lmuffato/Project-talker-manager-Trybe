const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { validateEmail, validatePassword } = require('./authMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND_STATUS = 404;
const CREATED_STATUS = 201;
const PORT = '3000';

// getTalkerById
app.get(
  '/talker/:id',
  (request, response) => {
    const { id } = request.params;
    const data = fs.readFileSync('./talker.json', { encoding: 'utf-8' });
    const jsonData = JSON.parse(data);
    const talker = jsonData.find((person) => +id === person.id);
    if (!talker) {
      return response
        .status(NOT_FOUND_STATUS)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
    response.status(HTTP_OK_STATUS).json(talker);
  },
);

// getAllTalkers
app.get('/talker', (_request, response) => {
  const data = fs.readFileSync('./talker.json', { encoding: 'utf-8' });
  const jsonData = JSON.parse(data);
  response.status(HTTP_OK_STATUS).json(jsonData);
});

app.post('/login', validateEmail, validatePassword, (request, response) => {
  const TOKEN_ALEATORY_KEY = 10;
  let token = '';
  for (let i = 0; i < TOKEN_ALEATORY_KEY; i += 1) {
    // Source: https://pt.stackoverflow.com/questions/107322/como-gerar-um-token-na-barra-de-link-com-javascript
    // max radix number 36 --> [0-9][A-Z]
    token += (Math.floor(Math.random() * 256)).toString(36);
  }
  const getLengthEqual16 = token.substr(0, 16);
  response.status(HTTP_OK_STATUS).json({ token: getLengthEqual16 });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
