const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const file = './talker.json';
const { validaEmail, 
  validaPassword,
  generateToken,
  validaToken,
  validaName,
  validaAge,
  validaTalker,
  validaDate,
  validaRate } = require('./validation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// req01
app.get('/talker', (request, response) => {
  fs.readFile(file, 'utf8')
  .then((content) => response.status(HTTP_OK_STATUS).send(JSON.parse(content)))
  .catch(() => response.status(401).json([]));
});

// req 02
app.get('/talker/:id', (request, response) => {
 const { id } = request.params;
 fs.readFile(file, 'utf8').then((talkers) => {
 const talkerjson = JSON.parse(talkers);
 const res = talkerjson.find((talkerId) => talkerId.id === parseInt(id, 10));
if (!res) return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
return response.status(HTTP_OK_STATUS).json(res);
});
});

// req 03
app.post('/login', validaEmail, validaPassword, (request, response) =>
  response.status(HTTP_OK_STATUS).json({ token: generateToken(16) }));

// req 04
app.post('/talker', 
  validaToken,
  validaName, 
  validaAge, 
  validaTalker, 
  validaDate, 
  validaRate,   
  async (request, response) => {
  const { name, age, talk } = request.body;
  const talkerlist = JSON.parse(await fs.readFile(file, 'utf8'));
  talkerlist.push({ id: talkerlist.length + 1, name, age, talk });
  await fs.writeFile(file, JSON.stringify(talkerlist));
  return response.status(201).json({ id: talkerlist.length, name, age, talk });
});

// req 05
app.put('/talker/:id',
  validaToken,
  validaName, 
  validaAge, 
  validaTalker, 
  validaDate, 
  validaRate,   
  async (request, response) => {
  const { id } = request.params;
  const { name, age, talk } = request.body;
  const talkersList = JSON.parse(await fs.readFile(file, 'utf-8'));
  const talkerIndex = talkersList.findIndex((talker) => talker.id === Number(id));
  if (talkerIndex === -1) {
    return response.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  talkersList[talkerIndex] = { ...talkersList[talkerIndex], name, age, talk };
  await fs.writeFile('./talker.json', JSON.stringify(talkersList));

  return response.status(200).send(talkersList[talkerIndex]);
});

// req 06 - feito com a ajuda do instrutor Italo
app.delete('/talker/:id', validaToken, async (request, response) => {
  const { id } = request.params;
  const read = await fs.readFile(file, 'utf8');
  const parse = JSON.parse(read);
  const talkerId = parse.filter((talker) => talker.id !== parseInt(id, 10));
  await fs.writeFile(file, JSON.stringify(talkerId));
  response.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

// req 07
app.get('/search', validaToken, (request, response) => {
  const { q } = request.query;
  const talkerlist = JSON.parse(fs.readFileSync(file, 'utf8'));
  const arrayResult = talkerlist.filter((talker) => talker.name.includes(q));
  if (!arrayResult || arrayResult === 0) { 
    return response.status(401).json(talkerlist); 
  }
  response.status(200).json(arrayResult);
});

app.listen(PORT, () => {
  console.log('Online');
});
