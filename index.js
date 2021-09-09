const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
// const crypto = require('crypto');

const { validateEmail, validatePassword, validateToken, validateName, validateAge, 
  validateDate, validateRate, validateTalk } = require('./validation.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const FILE = './talker.json';

// requisito 7
app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  
  const data = await fs.readFile(FILE, 'utf8');
  const talkerdata = JSON.parse(data);

  const filterTalkers = talkerdata.filter((item) => item.name.includes(q));

  if (!q || q === '') return res.status().json(talkerdata);

  if (!filterTalkers) return res.status().json([]);

  res.status(HTTP_OK_STATUS).json(filterTalkers);
});

// requisito 1
app.get('/talker', async (_req, res) => {
  const data = await fs.readFile(FILE, 'utf8');
  const talker = JSON.parse(data); // o readFile não sabe qual tipo de arquivo está lendo então preciso transformar esse dado em json

  return res.status(HTTP_OK_STATUS).json(talker);
});

// requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  
  const data = await fs.readFile(FILE, 'utf8');
  const talker = JSON.parse(data);

  const talkerId = talker.find((item) => item.id === Number(id));

  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(talkerId);
});

// requisito 3
app.post('/login', validateEmail, validatePassword, (_req, res) => {
  // const tokenNumber = crypto.randomBytes(16).toString('hex'); 
  // crio um numero aleatorio de 16 caracteres, tive ajuda do Pedro Ramos durante o plantão
  // console.log(tokenNumber);

  res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
});

// requisito 4
app.post('/talker', validateToken, validateName, validateAge, 
validateTalk, validateDate, validateRate, async (req, res) => {
  const { name, age, talk } = req.body;
  
  const data = await fs.readFile(FILE, 'utf8');
  const talkerData = JSON.parse(data);
  
  const id = talkerData.length + 1; // adiciono o id

  talkerData.push({ id, name, age, talk });

  await fs.writeFile(FILE, talkerData);
  // leio o arquivo talker.json, transformo em json e adiciono um novo objeto, depois pego esse arquivo atualizado e altero no talker.jdon com o writeFile

  return res.status(201).json({ id, name, age, talk });
});

// requisito 5
app.put('/talker/:id', validateToken, validateName, validateAge, 
validateTalk, validateDate, validateRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  
  const data = await fs.readFile(FILE, 'utf8');
  const talkerFile = JSON.parse(data);

  const talkerFilter = talkerFile.filter((item) => item.id !== Number(id)); // filtro o arquivos com com todos os objetos menos com o do id do params

  talkerFilter.push({ id, name, age, talk }); // adiciono um novo objeto com o id que foi indicado no params

  await fs.writeFile(FILE, talkerFilter);

  return res.status(HTTP_OK_STATUS).json({ id, name, age, talk });
});

// requisito 6
app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  
  const data = await fs.readFile(FILE, 'utf8');
  const talkerFile = JSON.parse(data);

  const talkerFilter = talkerFile.filter((item) => item.id !== Number(id)); // filtro o arquivos com com todos os objetos menos com o do id do params

  await fs.writeFile(FILE, talkerFilter);

  return res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
