const HTTP_OK_STATUS = 200;
const fs = require('fs').promises;

const deleteTalkerID = async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile('talker.json', 'utf8').then((e) => JSON.parse(e));
  const talker = data.filter((e) => e.id !== +id); // casting unary
  await fs.writeFile('./talker.json', JSON.stringify(talker));

  return res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalkerID;
