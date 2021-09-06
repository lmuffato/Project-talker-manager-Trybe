const express = require('express');
const bodyParser = require('body-parser');
const routerTalker = require('./routerTalker');
const { gerarToken } = require('./token');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!email.match(/\S+@\S+\.\S+/)) {
 return res.status(400).json(
    { message: 'O "email" deve ter o formato "email@email.com"' },
  ); 
}
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
 return res.status(400).json(
    { message: 'O "password" deve ter pelo menos 6 caracteres' },
  ); 
}

  res.status(200).json({ token: gerarToken() });
});

app.use('/talker', routerTalker);

app.listen(PORT, () => {
  console.log('Online');
});

// ref validar email - https://ui.dev/validate-email-address-javascript/