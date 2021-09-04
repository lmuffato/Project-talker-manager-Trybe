const express = require('express');
const bodyParser = require('body-parser');
const getTalkers = require('./routes/getAllTalkers');
const getTalkerById = require('./routes/getTalkerById');
const authVerification = require('./routes/authVerification');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkers);

app.post('/login', authVerification);

app.get('/talker/:id', getTalkerById);

app.listen(PORT, () => {
  console.log('Online');
});
