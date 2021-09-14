const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto-extra');
const myModule = require('./modules');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const FILE_NAME = './talker.json';
// const isEmail = require('./modules');
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const data = await myModule.readFileAsync(FILE_NAME);
  if (!data) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).send(JSON.parse(data));
});

app.get('/talker/:id', async (req, res) => {
  const data = await myModule.readFileAsync(FILE_NAME);
  const talkersId = await Number(req.params.id);
  const getTalker = await JSON.parse(data).find((talker) => talker.id === talkersId);

  if (!getTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).send(getTalker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomKey(16);
  const emailMessage = myModule.validateEmail(email);
  const passwordMessage = myModule.validatePassword(password);
  if (emailMessage) {
    return res.status(400).json(emailMessage);
  } 
  if (passwordMessage) {
    return res.status(400).json(passwordMessage);
  }
  
  res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
