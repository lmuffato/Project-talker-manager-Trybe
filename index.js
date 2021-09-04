const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const routerTalkers = require('./routes/routerTalkers');
const routerLogin = require('./routes/routerLogin');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use('/login', routerLogin);
app.use('/talker', routerTalkers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
