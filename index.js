const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const talkerRouter = require('./src/Router/talkerRouter');
const loginRouter = require('./src/Router/loginRouter');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log('Online');
});
