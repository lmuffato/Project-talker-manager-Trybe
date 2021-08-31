const HTTP_OK_STATUS = 200;
const fs = require('fs').promises;

const putTalkerID = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;

  const data = await fs.readFile('talker.json', 'utf8').then((e) => JSON.parse(e));
  const talker = data.map((e) => (e.id === +id ? { name, age, id: +id, talk } : e));

  await fs.writeFile('./talker.json', JSON.stringify(talker));
  return res.status(HTTP_OK_STATUS).json({ name, age, id: +id, talk });
};

module.exports = putTalkerID;
