// Packages
const express = require('express'); // Construção de aplicações
const bodyParser = require('body-parser'); // Converter o body da requisição em .json()
const crypto = require('crypto'); // Pacote node de criptografia, usado para gerar tokens de sessão 

// Functions
const { getTalkers } = require('./functions/getTalkers');
const { filterById } = require('./functions/filterById');

// Middlewares de validação
const { emailValidation } = require('./middlewares/validations/emailValidation');
const { passwordValidation } = require('./middlewares/validations/passwordValidation');
const { tokenValidation } = require('./middlewares/validations/tokenValidation');
const { nameValidation } = require('./middlewares/validations/nameValidation');
const { ageValidation } = require('./middlewares/validations/ageValidation');
const { talkValidation } = require('./middlewares/validations/talkValidation');
const { watchedAtValidation } = require('./middlewares/validations/watchedAtValidation');
const { rateValidation } = require('./middlewares/validations/rateValidation');

// Middlewares de CRUD
const { registerTalker } = require('./middlewares/postTalker');
const { updateTalker } = require('./middlewares/putTalker');
const { deleteTalker } = require('./middlewares/deleteTalker');

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
// http GET :3000/talker           // HTTPIE;   (ok)
// http://localhost:3000/talker    // navegador (ok);
*/

// GET - Rota para acessar o conteúdo de talkers.json filtrando por id
app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await getTalkers(); // Carrega todos os talkers da database
  const talker = await filterById(talkers, id); // Filtra o talker pelo id
  if (!talker || talker.length === 0) { // Se a database 'talker' for um array vazio
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
echo '{"email":"email@email.com", "password":"123456789" }' | http POST :3000/login  // (ok) retorna o token 
http POST :3000/login email='email@email.com' password='123456789'                   // (ok) retorna o token 
http POST :3000/login email='' password='123456789'                                  // (error)
http POST :3000/login email='email@email.com' password=''                            // (error)
http POST :3000/login email='' password=''                                           // (error)
*/

// POST - Rota para cadastrar novos talkers
app.post('/talker',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
watchedAtValidation,
rateValidation,
registerTalker,
async () => {});
/* REQUISIÇÃO
Requisição complexa no httpie - objeto de vários níveis no body e headers
echo '{"name": "Danielle Santos", "age": 56, "talk": { "watchedAt": "22/10/2019", "rate": 5 } }' | http POST :3000/talker authorization:"375c3a2e0051b630"
*/

// PUT - Rota para alterar os talkers
app.put('/talker/:id',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
watchedAtValidation,
rateValidation,
updateTalker,
async () => {

});
/* REQUISIÇÃO
Requisição complexa no httpie - objeto de vários níveis no body e headers
echo '{"name": "Danielle Santos", "age": 56, "talk": { "watchedAt": "22/10/2019", "rate": 4 } }' | http PUT :3000/talker/4 authorization:"375c3a2e0051b630"         // (ok)
echo '{id: 5, "name": "Danielle Santos", "age": 56, "talk": { "watchedAt": "22/10/2019", "rate": 4 } }' | http PUT :3000/talker/4 authorization:"375c3a2e0051b630"  // (ok)
echo '{id: 5, "name": "Danielle Santos", "age": 56, "talk": { "watchedAt": "22/10/2019", "rate": 4 } }' | http PUT :3000/talker/4 authorization:"375c3a2e0051b630"  // (error)
*/

// DELETE - Rota para delete os talkers
app.delete('/talker/:id',
tokenValidation,
deleteTalker,
async () => {

});
/* REQUISIÇÃO
Requisição complexa no httpie - objeto de vários níveis no body e headers
http DELETE :3000/talker/4 authorization:"375c3a2e0051b630"         // (ok)
*/

app.listen(PORT, () => { console.log('Online'); });
