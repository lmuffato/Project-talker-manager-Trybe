const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const generateToken = require('./middlewares-auth/token');

const {
  validateEmail,
  validatePassword,
} = require('./middlewares-auth/login');

const {
  validaRate,
  validaWatchedAt,
  validaTalk,
  validaToken,
  validaIdade,
  validaNome,
} = require('./middlewares-auth/talker');

const managerTalkData = require('./dataManager');

const DOC_DATA = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// ___________________________requisito1_________________________________
app.get('/talker', (_req, res) => {
  const talkerData = JSON.parse(fs.readFileSync(DOC_DATA, 'utf8'));

  if (talkerData.length === 0) return res.status(HTTP_OK_STATUS).json([]);
  res.status(HTTP_OK_STATUS).json(talkerData);
});

// __________________________requisito07_________________________________
app.get('/talker/search', validaToken, (req, res) => {
  const { q } = req.query;

  const results = managerTalkData();

  const result = results.filter((person) => person.name.includes(q));

  if (q === '' || !q) {
    return res.status(HTTP_OK_STATUS).json(results);
  }

  if (result === []) {
    return res.status(HTTP_OK_STATUS).json([]);
  }

  return res.status(HTTP_OK_STATUS).json(result);
});

// ___________________________requisito2_________________________________
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;

  const talkerData = managerTalkData();
  const dataPerson = talkerData.find((person) => person.id === parseInt(id, 10));

  if (dataPerson === undefined) {
    return res.status(NOT_FOUND)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(dataPerson);
});
// __________________________requisito3__________________________________

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = generateToken();

  res.status(HTTP_OK_STATUS).json({ token });
});

// __________________________requisito4________________________________

app.post(
  '/talker',
  validaToken,
  validaNome,
  validaIdade,
  validaTalk,
  validaWatchedAt,
  validaRate,
  (req, res) => {
  const { name, age, talk } = req.body;

  const result = managerTalkData();

  const newPerson = { id: result.length + 1, name, age, talk };

  fs.writeFileSync(DOC_DATA, JSON.stringify([...result, newPerson]));

  return res.status(201).json(newPerson);
},
);

// __________________________requisito05______________________________
app.put(
  '/talker/:id',
  validaToken,
  validaNome,
  validaIdade,
  validaTalk,
  validaWatchedAt,
  validaRate,
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    const results = managerTalkData();

    const personId = results.findIndex((r) => r.id === parseInt(id, 10));
    results[personId] = { ...results[personId], name, age, talk };

    fs.writeFileSync(DOC_DATA, JSON.stringify(results));

    return res.status(HTTP_OK_STATUS).json(results[personId]);
  },
);

// __________________________requisito06_______________________________
app.delete('/talker/:id', validaToken, (req, res) => {
  const { id } = req.params;

  const results = managerTalkData();

  const personId = results.findIndex((r) => r.id === parseInt(id, 10));

  results.splice(personId, 1);

  fs.writeFileSync(DOC_DATA, JSON.stringify(results));

  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
