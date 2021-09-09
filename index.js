const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { readContentFile, writeContentFile } = require('./readWriteFile');
const {
  validateName,
  validateAge,
  validateTalk, validateRate,
  validateWatchedAt,
} = require('./talkerValidation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
const content = await fs.readFile('./talker.json');
const talks = JSON.parse(content);
  res.status(HTTP_OK_STATUS).json(talks);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const content = await fs.readFile('./talker.json');
const talks = JSON.parse(content);
  const talkById = talks.find((t) => t.id === parseInt(id, 10));
  if (!talkById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(talkById);
});

const createToken = () => {
  const random1 = Math.random().toString(36).substr(2, 8);
  const random2 = Math.random().toString(36).substr(2, 8);
  const token = `${random1}${random2}`;
  return token;
 };

const validateEmail = (req, res, next) => { 
  const { email } = req.body;
  if (!email || email === '') {
return res.status(400)
  .json({ message: 'O campo "email" é obrigatório' }); 
}
  const regex = /\S+@\S+\.\S+/;
  if (regex.test(email) === false) {
return res.status(400)
  .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}
  next();
};

app.post('/login', validateEmail, (req, res) => {
  const { password } = req.body;
  
  if (!password || password === '') {
 return res.status(400)
   .json({ message: 'O campo "password" é obrigatório' }); 
}
   if (password.length < 6) {
 return res.status(400)
   .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });   
}

const token = createToken();
res.status(HTTP_OK_STATUS).json({ token });
});

const validateToken = (req, res, next) => {
const { authorization } = req.headers;
if (!authorization || authorization === '') {
 return res.status(401)
  .json({ message: 'Token não encontrado' }); 
}
  if (authorization.length !== 16) {
    return res.status(401)
      .json({ message: 'Token inválido' }); 
    }
next();
}; 

app.post('/talker', validateToken, validateName, validateAge,
validateTalk, validateRate, validateWatchedAt, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkerList = await readContentFile();
  const newTalker = { id: talkerList.length + 1, name, age, talk };
  await writeContentFile(newTalker);
  
  res.status(201).json(newTalker);
}); 

app.listen(PORT, () => {
  console.log('Online');
});
