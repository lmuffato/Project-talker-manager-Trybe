const express = require('express'); // Construção de aplicações
const bodyParser = require('body-parser'); // Converter o body da requisição em .json()
const { getTalkers } = require('./functions/getTalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000'; // Porta usada pela api

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Rota para acessar o conteúdo de talkers.json
app.get('/talker', async (_request, response) => {
  const talkers = await getTalkers();
  return response.status(200).json(talkers);
}); 
/*
// http GET :3000/talker
// http://localhost:3000/talker
*/

app.listen(PORT, () => {
  console.log('Online');
});
