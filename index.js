const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
// INCÍCIO MINHAS IMPLEMENTAÇÕES
// função que lê o json, retorna null se o array for de tamanho 0.
const readFileCustom = async () => {
  let file = await fs.readFile('talker.json');
  file = JSON.parse(file);
  if (file.length === 0) return null;
  return file;
  // console.log(file.length);
};
// req 1
app.get('/talker', async (_req, res) => {
  const talker = await readFileCustom();
  if (!talker) return res.status(HTTP_OK_STATUS).send([]);
  res.status(HTTP_OK_STATUS).send(talker);
});
// readFileCustom();
// FINAL MINHAS IMPLEMENTAÇÕES

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
