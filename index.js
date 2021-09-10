const express = require('express'); // Construção de aplicações
const bodyParser = require('body-parser'); // Converter o body da requisição em .json()
const crypto = require('crypto'); // Pacote node de criptografia, usado para gerar tokens de sessão 
const { getTalkers } = require('./functions/getTalkers');
const { filterById } = require('./functions/filterById');
const {
  emptyEmail,
  emptyPassword,
  validEmail,
  validPassword, 
} = require('./functions/validateLogin.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000'; // Porta usada pela api

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// GET - Rota para acessar o conteúdo de talkers.json
app.get('/talker', async (_request, response) => {
  const talkers = await getTalkers();
  return response.status(200).json(talkers);
}); 
/* REQUISIÇÃO
// http GET :3000/talker // HTTPIE;
// http://localhost:3000/talker //(navegador);
*/

// GET - Rota para acessar o conteúdo de talkers.json filtrando por id
app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await getTalkers();
  const talker = await filterById(talkers, id);
  if (!talker || talker.length === 0) {
    return response.status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(200).json(talker);
}); 
/* REQUISIÇÃO
// http GET :3000/talker/1          // HTTPIE (ok);
// http://localhost:3000/talker/1   // navegador (ok);
// http GET :3000/talker/5          // HTTPIE (mensagem de erro);
*/

// POST - Rota para validar um login e gerar um token;
app.post('/login', async (request, response) => {
  const { email, password } = request.body;
  if (emptyEmail(email)) { // Se o campo email estiver vazio retorna true
    return response.status(404)
  .json({ message: 'O campo "email" é obrigatório' });
  }
  if (emptyPassword(password)) { // Se o campo password estiver vazio retorna true
    return response.status(404)
  .json({ message: 'O campo "password" é obrigatório' });
  }
  if (validEmail(email) && validPassword(password)) { // A função de validação retorna true se o campo for válido;
    const token = crypto.randomBytes(8).toString('hex'); // gera um token de 6 caracteres
    return response.status(200).json({ token: `${token}` });
  }
});
/*
http POST :3000/login email='email@email.com' password='123456789' // (ok) retorna o token 
http POST :3000/login email='' password='123456789' // (error) retorna { message: 'O campo "email" é obrigatório' }
http POST :3000/login email='email@email.com' password='' // (error) retorna { message: 'O campo "password" é obrigatório' }
http POST :3000/login email='' password='' // (error) retorna { message: 'O campo "email" é obrigatório' }
*/

app.listen(PORT, () => {
  console.log('Online');
});
