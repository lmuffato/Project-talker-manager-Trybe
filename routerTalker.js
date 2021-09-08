const fs = require('fs').promises;
const express = require('express');
const { verifyToken, verifyName } = require('./auth');

// Agradecimento à Marcelo Maurício, turma 10 -tribo A pela ajuda no entendimento
// da sincronicidade da requisição de dados e lógica de autenticação.

const talker = './talker.json';
const talkers = async () => {
  const list = await fs.readFile(talker);
  const responseList = await JSON.parse(list);
  return responseList;
};
const router = express.Router();
const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;

// requisito 1
router.get('/', async (_request, response) => {
  const dataTalker = await talkers();
  if (dataTalker.length === 0) return response.status(HTTP_OK_STATUS).json([]);
  return response.status(HTTP_OK_STATUS).json(dataTalker);
});

//  requisito 2
router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const dataTalker = await talkers();
  const findTalker = dataTalker.find((elem) => elem.id === parseInt(id, 10));
  if (!findTalker) {
    return response.status(HTTP_ERROR_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).json(findTalker);
});

// requisito 4
router.post('/',
verifyToken,
verifyName,
(request, response) => {
  const { name, age, talk: { watchedAt, rate } } = request.body;
  const newTalker = { name, age, talk: { watchedAt, rate } };
  /* const listTalkers = await talkers();
  
  listTalkers.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(listTalkers)); */
  return response.status(201).json({
    newTalker,
  });
});

module.exports = router;
