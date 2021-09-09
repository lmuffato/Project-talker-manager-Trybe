const express = require('express'); // Construção de aplicações
const bodyParser = require('body-parser'); // Converter o body da requisição em .json()
const { getTalkers } = require('./functions/getTalkers');
const { filterById } = require('./functions/filterById');

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
// http GET :3000/talker/1 // HTTPIE;
// http://localhost:3000/talker/1 //(navegador);
*/

// ### GET - Rota para acessar a receita por id
// app.get('/recipes/:id', async (request, response) => {
//   const allRecipes = await readRecipes(); // devolve todos os dados
//     const { id } = await request.params; // O id desestruturado é passado como um parâmetro do resquest que irá compor uma nova subrota
//   const recipe = allRecipes.find((idRequest) => idRequest.id === parseInt(id));
//     if (!recipe) return res.status(404).json({ message: 'Recipe not found!'}); // Se a requisição não existe, retorna o status 404.
//   return response.status(200).json(recipe); // Se a requisição existir, retorna a receita no formato json()
// });
// http://localhost:3000/recipes/1
// http GET :3000/recipes/1

// Rota para acessar

app.listen(PORT, () => {
  console.log('Online');
});
