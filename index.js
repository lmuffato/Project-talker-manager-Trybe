const express = require('express'); // Construção de aplicações
const bodyParser = require('body-parser'); // Converter o body da requisição em .json()
const crypto = require('crypto'); // Pacote node de criptografia, usado para gerar tokens de sessão 
const { getTalkers } = require('./functions/getTalkers');
const { registerTalker } = require('./functions/writeTalker');
const { filterById } = require('./functions/filterById');
const { emailValidation } = require('./middlewares/emailValidation');
const { passwordValidation } = require('./middlewares/passwordValidation');
const { tokenValidation } = require('./middlewares/tokenValidation');
const { nameValidation } = require('./middlewares/nameValidation');
const { ageValidation } = require('./middlewares/ageValidation');
const { watchedAtValidation } = require('./middlewares/watchedAtValidation');
const { rateValidation } = require('./middlewares/rateValidation');

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
app.post('/login', emailValidation, passwordValidation, async (request, response) => {
  const token = await crypto.randomBytes(8).toString('hex'); // gera um token de 6 caracteres
  return response.status(200).json({ token: `${token}` });
});
/* REQUISIÇÃO
echo '{"email":"email@email.com", "password":"123456789" }' | http POST :3000/login
http POST :3000/login email='email@email.com' password='123456789' // (ok) retorna o token 
http POST :3000/login email='' password='123456789' // (error) retorna { message: 'O campo "email" é obrigatório' }
http POST :3000/login email='email@email.com' password='' // (error) retorna { message: 'O campo "password" é obrigatório' }
http POST :3000/login email='' password='' // (error) retorna { message: 'O campo "email" é obrigatório' }
*/

// Rota para cadastrar palestrante
app.post('/talker',
tokenValidation,
nameValidation,
ageValidation,
watchedAtValidation,
rateValidation,
registerTalker,
async (request, response) => {
// const { name, age, talk: { watchedAt, rate } } = request.body;
// const { authorization } = request.headers;
// const talkers = await registerTalker();
// return response.status(201).json(talkers);
});

/* REQUISIÇÃO
Requisição complexa - objeto de vários níveis no body e headers
echo '{"id": 1, "name": "Danielle Santos", "age": 56, "talk": { "watchedAt": "22/10/2019", "rate": 5 } }' | http POST :3000/talker authorization:"375c3a2e0051b630"
*/

app.listen(PORT, () => { console.log('Online'); });
