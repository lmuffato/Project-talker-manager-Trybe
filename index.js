const express = require('express');
const bodyParser = require('body-parser');

const talkerRouter = require('./routes/talkerRouter');
const loginRouter = require('./routes/loginRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Requisito 1 :Crie o endpoint GET /talker
// Requisito 2 :Crie o endpoint GET /talker/:id
// Requisito 4 :Crie o endpoint POST /talker
// Requisito 5 :Crie o endpoint PUT /talker/:id
// Requisito 6 :Crie o endpoint DELETE /talker/:id
// Requisito 7 :Crie o endpoint GET /talker/search?q=searchTerm
app.use('/talker', talkerRouter);

// Requisito 3: Crie o endpoint POST /login
app.use('/login', loginRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
