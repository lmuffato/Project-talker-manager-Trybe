const express = require('express');
const bodyParser = require('body-parser');
const talkers = require('./routes/talkerRoutes.js');
const login = require('./routes/loginRoutes.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use('/login', login);
app.use('/talker', talkers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
// projeto feito com a contribuição dos meus colegas de turma, Nilson Ribeiro e Adelino Junior.
// Referencia : https://github.com/AdelinoJnr