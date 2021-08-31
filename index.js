const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const data = require('./talker.json');
const {
  validateEmail,
  validatePassword,
  validateAge,
  validateName,
  validateTalk,
  isTokenValid,
} = require('./middlewares/validators');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => res.status(HTTP_OK_STATUS).json(data || []));

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = data.find((talker) => talker.id === +id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

app.post('/talker', validateName, validateAge, validateTalk, (req, res) => {
  const { name, age, talk } = req.body;
  const { authorization: token } = req.headers;

  const talker = {
    id: data.length + 1,
    name,
    age,
    talk,
  };
  
  if (!token) {
 return res
    .status(401)
    .json({ message: 'Token não encontrado' }); 
}
  
  if (!isTokenValid(token)) {
 return res
    .status(401)
    .json({ message: 'Token inválido' }); 
}
  
  return res.status(201).json(talker);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const randomToken = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token: randomToken });
});

app.listen(PORT, () => {
  console.log('Online');
});
