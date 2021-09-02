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

// cria endpoint /talker
app.get('/talker', async (_request, response) => {
  const talker = await fs.readFile('./talker.json', 'utf8');
  const result = await JSON.parse(talker);
  response.status(200).json(result);
});

// cria endpoint /talker/id que retorna o palestrante pelo id
app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talker = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talker);
  const pessoasPalestrantes = result.find((obj) => obj.id === parseInt(id, 0));
  if (!pessoasPalestrantes) {
    return response.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  response.status(200).json(pessoasPalestrantes);
});

// cria endpoint /login
const checarEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  next();
};
const validarEmail = (req, res, next) => {
  const { email } = req.body;
  const emailValido = /\w+@\w+.\w+/g;
  if (emailValido.test(email) === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};
const checarSenha = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  next();
};

const validarSenha = (req, res, next) => {
  const { password } = req.body;
  const senhaValida = /^.{6,}$/g;
  if (senhaValida.test(password) === false) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

// gerador de token https://qastack.com.br/programming/1349404/generate-random-string-characters-in-javascript
const randomToken = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const characterLength = characters.length;
  for (let i = 0; i < 16; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characterLength));
  }
  return result;
};

app.post('/login', checarEmail, validarEmail, checarSenha, validarSenha, (_req, res) => {
  res.status(200).json({ token: randomToken() });
});

app.listen(PORT, () => {
  console.log('Online');
});
