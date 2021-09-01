const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { validaEmail, validaPassword, generateToken, validaToken } = require('./validation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// req01
app.get('/talker', (_request, response) => {
  fs.readFile('./talker.json', 'utf8')
  .then((content) => response.status(HTTP_OK_STATUS).send(JSON.parse(content)))
  .catch(() => response.status(401).json([]));
});

// req 02
app.get('/talker/:id', (_request, response) => {
 const { id } = _request.params;
 fs.readFile('./talker.json', 'utf8').then((talkers) => {
 const talkerjson = JSON.parse(talkers);
 const res = talkerjson.find((talkerId) => talkerId.id === parseInt(id, 10));
if (!res) return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
return response.status(HTTP_OK_STATUS).json(res);
});
});

// req 03
app.post('/login', validaEmail, validaPassword, (_request, response) =>
  response.status(HTTP_OK_STATUS).json({ token: generateToken(16) }));

// req 06
// app.delete('/talker/:id', validaToken, async (_request, response) => {
//   const { id } = _request.params;
//   fs.readFile('./talker.json', 'utf8').then((talkers) => {
//   const talkerjson = JSON.parse(talkers);
//   const talkerId = talkerjson.filter((talker) => talker.id !== parseInt(id, 10));
//   fs.writeFile('./talker.json', JSON.stringify(talkerId)).then(() => 
//   response.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' }));
// });
// });

app.delete('/talker/:id', validaToken, async (_request, response) => {
  const { id } = _request.params;
  const read = await fs.readFile('.talker.json', 'utf8');
  const parse = JSON.parse(read);
  const talkerId = parse.filter((talker) => talker.id !== parseInt(id, 10));
  await fs.writeFile('./talker.json', JSON.stringify(talkerId));
  response.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
