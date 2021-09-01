const express = require('express');
const bodyParser = require('body-parser');
const { getAllTalkers } = require('./getAllTalkers');
// const router = require('./router');

const app = express();
app.use(bodyParser.json());

app.get('/talker', getAllTalkers);

// app.use('/caminho', router);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

/* app.get('/talk', (request, response) => {
  response.status(200).json({ teste: alguma csoisa})
} */

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
