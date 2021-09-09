const fs = require('fs').promises;
const bodyParser = require('body-parser');
const express = require('express');
const { verifyToken, verifyName, verifyAge,
  verifyWatchedAt, verifyRate, verifyTalk } = require('./auth');

// Agradecimento à Marcelo Maurício, turma 10 -tribo A pela ajuda no entendimento
// da sincronicidade da requisição de dados e lógica de autenticação.

// Agradecimento à PedroGordo - turma 09, Nonato - turma 07, Johnatas - instrução Trybe (turma 11)
// pelo suporte nos pontos talk, e resposta do resquisito 4

const talker = './talker.json';

const talkers = async () => {
  const list = await fs.readFile(talker);
  const responseList = await JSON.parse(list);
  return responseList;
};
const router = express.Router();
router.use(bodyParser.json());
const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;

// requisito 1
router.get('/', async (_request, response) => {
  const listTalkers = await talkers();
  if (listTalkers.length === 0) return response.status(HTTP_OK_STATUS).json([]);
  return response.status(HTTP_OK_STATUS).json(listTalkers);
});

//  requisito 2
router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const listTalkers = await talkers();
  const findTalker = listTalkers.find((elem) => elem.id === parseInt(id, 10));
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
verifyAge,
verifyTalk,
verifyWatchedAt,
verifyRate,
async (request, response) => {
  const listTalkers = await talkers();
  const newTalker = { id: listTalkers.length + 1, ...request.body };
  
  listTalkers.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(listTalkers));
  return response.status(201).json(newTalker);
});

// requisito 5
router.put('/:id',
verifyToken,
verifyName,
verifyAge,
async (request, response) => {
  const { id } = request.params;
  const listTalkers = await talkers();

  const findTalker = listTalkers.findIndex((elem) => elem.id === parseInt(id, 10));
  listTalkers[findTalker] = { ...listTalkers[findTalker], ...request.body };
  return response.status(HTTP_OK_STATUS).json(listTalkers[findTalker]);
});

module.exports = router;
