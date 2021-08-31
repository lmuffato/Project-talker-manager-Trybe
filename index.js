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

app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const content = await fs.readFile('./talker.json');
    const talker = JSON.parse(content);
    const talkerId = talker.findIndex((t) => t.id === +id);
    if (talkerId === -1) {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } else {
      res.status(200).json(talker[talkerId]);
    }
});

// 3 - Crie o endpoint POST /login

const loginRouter = require('./loginRouter');

app.use('/login', loginRouter);

// 4 - Crie o endpoint POST /talker

const talkerRouter = require('./talkerRouter');

app.use('/talker', talkerRouter);

// 5 - Crie o endpoint PUT /talker/:id

const editRouter = require('./editRouter');

app.use('/talker/:id', editRouter);

// 6 - Crie o endpoint DELETE /talker/:id

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

app.delete('/talker/:id', findToken, checkToken, async (req, res) => {
  const { id } = req.params;
  const content = await fs.readFile('./talker.json');
  const talker = JSON.parse(content);
  const otherTalker = talker.filter((t) => t.id !== +id);
  await fs.writeFile('./talker.json', JSON.stringify(otherTalker));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});