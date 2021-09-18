const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile('./talker.json', 'utf-8');
  const fetchData = await JSON.parse(data);
  const talkerId = fetchData.find((r) => r.id === +id);

  delete data[talkerId];
  await fs.writeFile('./talker.json', JSON.stringify(data));
  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
