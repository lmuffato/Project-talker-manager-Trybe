const express = require('express');
const bodyParser = require('body-parser');
const routerLogin = require('./routerLogin');
const routerPostTalker = require('./postTalker');
const fileTalker = require('./fileTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requirement 01
app.get('/talker', async (_req, res) => {
  try {
    const file = await fileTalker();
    res.status(200).json(file);
  } catch (e) {
    return res.status(200).json([]);
  }
});

// Requirement 02

app.get('/talker/:id', async (req, res) => {
   const { id } = req.params;
   const file = await fileTalker();
   const findById = file.find((elem) => elem.id === Number(id));
   if (!findById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
   res.status(200).json(findById); 
});

// Requirement 03
app.use('/login', routerLogin);

// Requirement 04
app.use('/talker', routerPostTalker);

app.listen(PORT, () => {
  console.log('Online');
});
