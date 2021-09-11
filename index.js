const express = require('express');
const bodyParser = require('body-parser');
const { 
  HTTP_OK_STATUS,
  HTTP_SERVER_ERROR,
 } = require('./utils/serverStatus');

const talkerRouter = require('./routes/talker');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);

app.use((err, _req, res, _next) => {
  res.status(HTTP_SERVER_ERROR).json({ error: `Error: ${err.message}` });
});

app.listen(PORT, () => {
  console.log('Online');
});
