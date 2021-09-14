const HTTP_OK_STATUS = 200;
const HTTP_OK_CREATED = 201;
const talkersList = require('../talker.json');

async function fullQuery(_req, res) {
res.status(HTTP_OK_STATUS).json(talkersList);  
}

async function queryId(req, res) {
  const { id } = req.params;
  const talkerFind = talkersList.find((talker) => talker.id === +id);
  if (!talkerFind) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
   res.status(HTTP_OK_STATUS).json(talkerFind);
  }
async function querySearch(req, res) {
  const { q } = req.query;
  const filteredTalker = talkersList.filter((talker) => talker.name.includes(q));
   res.status(HTTP_OK_STATUS).json(filteredTalker);
}

async function queryPush(req, res) {
  const { id, name, age, talk } = req.body;
  talkersList.push({ id, name, age, talk });
  res.status(HTTP_OK_CREATED).json(req.body);
}

async function queryChange(req, res) {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const index = talkersList.findIndex((talker) => talker.id === +id);
  if (index === -1) return res.status(404).json({ message: 'id not found' });
  talkersList[index] = { id, name, age, talk };
  res.status(204).end();
}

async function queryDelete(req, res) {
  const { id } = req.params;
  const index = talkersList.findIndex((talker) => talker.id === +id);
  if (index === -1) return res.status(404).json({ message: 'id not found' });
  talkersList.splice(index, 1);
  res.status(204).end();
}

module.exports = {
  querySearch,
  queryId,
  fullQuery,
  queryPush,
  queryChange,
  queryDelete,
};