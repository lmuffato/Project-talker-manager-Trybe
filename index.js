const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

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
  const talk = talks.find((t) => t.id === parseInt(id, 10));
  if (!talk) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(talk);
});

const createToken = (req, res, next) => { 
  const randonStringGenerator = () => {
    const random1 = Math.random().toString(36).substr(2, 8);
  const random2 = Math.random().toString(36).substr(2, 8);
  return `${random1}${random2}`;
 };

 req.token = randonStringGenerator();
 
 next();
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

app.post('/login', createToken, validateEmail, (req, res) => {
  const { password } = req.body;
  const { token } = req;

  if (!password || password === '') {
 return res.status(400)
   .json({ message: 'O campo "password" é obrigatório' }); 
}
   if (password.length < 6) {
 return res.status(400)
   .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}
  res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
