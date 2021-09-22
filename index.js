const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const fileTalker = fs.readFileSync('./talker.json');
const HTTP_OK_STATUS = 200;
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log('Online');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  res.status(HTTP_OK_STATUS).send(fileTalker);
});

// app.get('/talker/:id', (req, res) => {
//   // const { id } = req.params;
  
//   const test = fs.readFileSync('./talker.json');
//   const result = test.toString();
//   const resultJSON = result;
//   res.status(HTTP_OK_STATUS).send(resultJSON);
// });
