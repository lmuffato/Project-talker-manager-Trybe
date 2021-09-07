const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const { StatusCodes } = require('http-status-codes');
const talkerRoutes = require('./routes/talkerRoutes');
const getTalkerByIdRoutes = require('./routes/talkerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const addTalker = require('./routes/talkerRoutes');

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(StatusCodes.OK).send();
});

app.use('/talker', talkerRoutes);

app.use('/talker', getTalkerByIdRoutes);

app.use('/login', loginRoutes);

app.use('/talker', addTalker);

app.listen(PORT, () => {
  console.log('Online');
});
