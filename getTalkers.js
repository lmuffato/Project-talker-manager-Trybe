const fs = require('fs').promises;
const validToken = require('./validation');

function readingFile() {
  const theFile = 'talker.json';
  return fs.readFile(theFile, 'utf8')
  .then((data) => JSON.parse(data));
}

const getAllTalkers = async (_req, res) => {
  const allTalkersList = await readingFile();
  return res.status(200).json(allTalkersList);
};

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const allTalkers = await readingFile();
  const talkerById = allTalkers.find((talk) => talk.id === parseInt(id, 10));
  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

res.status(200).json(talkerById);
};

/* // só pra né

const addTalker = async (req, res) => {
const { name, age, talk } = req.body;
await validToken();
// leitura dos palestrantes
const oldTalkers = await readingFile();
// cria variavel do novo palestrante
const newTalker = {
  name, age, talk, id: oldTalkers.lenght + 1,
};
// cria variavel que adiciona aos antigos palestrantes, o novo
const attTalkers = oldTalkers.push(newTalker);
// escreve no arquivo o novo dado de palestrantes
await fs.writeFile('talker.json', JSON.stringfy(attTalkers));
  res.status(200).json(newTalker);
}; */

module.exports = { getAllTalkers, getTalkerById, addTalker };

// referência parseInt : https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
