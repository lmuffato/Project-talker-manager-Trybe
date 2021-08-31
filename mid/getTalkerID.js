const ERROR_STATUS = 404;
const HTTP_OK_STATUS = 200;
const fs = require('fs').promises;

async function search(id) {
  const talker = await fs.readFile('./talker.json', 'utf-8')
  .then((e) => JSON.parse(e));

  return talker.filter((e) => e.id === parseInt(id, 10)); // https://eslint.org/docs/rules/radix
}

const getTalkerID = async (req, res) => {
  const { id } = req.params;
  const talker = await search(id);

  if (talker.length > 0) {
    return res.status(HTTP_OK_STATUS).json(talker[0]);
  }

  return res.status(ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = { getTalkerID };
