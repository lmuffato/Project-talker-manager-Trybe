const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const loginRouter = require('./loginRouter');
const validateToken = require('./middlewares/validateToken');

const talkerValidation = require('./middlewares/checkPostTalkers');

const arrayPeople = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getTalkers = async () => fs.readFile(arrayPeople, 'utf-8').then((data) => JSON.parse(data));

// Requisito 7 - Crie o endpoint GET /talker/search?q=searchTerm

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkersArray = await getTalkers();
  const filterTalkers = talkersArray.filter((talker) => talker.name.includes(q));

  if (!q) return res.status(202).json(talkersArray);

  res.status(HTTP_OK_STATUS).json(filterTalkers);
});

// ----------------------------------------

// Requisito 1 - Crie o endpoint GET /talker

app.get('/talker', async (_req, res) => {
  const arrayToSend = await getTalkers();

  // if (!arrayToSend) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(arrayToSend);
});

// ----------------------------------------

// Requisito 3 - Crie o endpoint POST /login

app.use('/login', loginRouter);

// ----------------------------------------

// Requisito 4 - Crie o endpoint POST /talker

app.post('/talker', validateToken, talkerValidation, async (req, res) => {
  const { name, age, talk } = req.body;
  const arrayToSend = await getTalkers();

  const aceptedPerson = {
    id: (arrayToSend.length) + 1,
    name,
    age,
    talk,
  };
  
  arrayToSend.push(aceptedPerson);

  await fs.writeFile('./talker.json', JSON.stringify(arrayToSend));

  res.status(201).json(aceptedPerson);
});

// ----------------------------------------

// Requisito 2 - Crie o endpoint GET /talker/:id

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkersArray = await getTalkers();
  const filterTalker = talkersArray.find((talker) => talker.id === Number(id));

  if (!filterTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(HTTP_OK_STATUS).json(filterTalker);
});

// ----------------------------------------

// Requisito 5 - Crie o endpoint PUT /talker/:id

app.put('/talker/:id', validateToken, talkerValidation, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const arrayToSend = await getTalkers();
  const talkerToChange = arrayToSend.findIndex((talker) => talker.id === Number(id));

  // if (talkerToChange === -1) return res.status(404).json({ message: 'Pessoa não encontrada' });

  arrayToSend[talkerToChange] = { ...arrayToSend[talkerToChange], name, age, talk };

  await fs.writeFile('./talker.json', JSON.stringify(arrayToSend));

  res.status(200).json(arrayToSend[talkerToChange]);
});

// ----------------------------------------

// Requisito 6 - Crie o endpoint DELETE /talker/:id

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const arrayToSend = await getTalkers();
  const talkerToChange = arrayToSend.findIndex((talker) => talker.id === Number(id));

  delete arrayToSend[talkerToChange];

  await fs.writeFile('./talker.json', JSON.stringify(arrayToSend));

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

// ----------------------------------------

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
