const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const fs = require('fs').promises;

// 7 - Crie o endpoint GET /talker/search?q=searchTerm

const findToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  next();
};

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

app.get('/talker/search', findToken, checkToken, async (req, res) => {
  const { q } = req.query;
  const content = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(content);
  const filteredTalker = talker.filter((t) => t.name.includes(q));
  res.status(200).json(filteredTalker);
});

// 1 - Crie o endpoint GET /talker

app.get('/talker', async (_req, res) => {
  try {
    const content = await fs.readFile('./talker.json');
    const talker = JSON.parse(content);
    res.status(200).json(talker);
  } catch (e) {
    res.status(200).json([]);
  }
});

// 2 - Crie o endpoint GET /talker/:id

const talkerIdRouter = require('./talkerIdRouter');

app.use('/talker/', talkerIdRouter);

// 3 - Crie o endpoint POST /login

const loginRouter = require('./loginRouter');

app.use('/login', loginRouter);

// 4 - Crie o endpoint POST /talker

const talkerRouter = require('./talkerRouter');

app.use('/talker', talkerRouter);

// 5 - Crie o endpoint PUT /talker/:id

const editRouter = require('./editRouter');

app.use('/talker/', editRouter);

// 6 - Crie o endpoint DELETE /talker/:id

const deleteRouter = require('./deleteRouter');

app.use('/talker/', deleteRouter);
