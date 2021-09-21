const fs = require('fs').promises;

const deleteTalker = async (req, res) => {
  const { id } = req.params;

  const json = JSON.parse(await fs.readFile('./talker.json'));
  const indexToExclude = json.findIndex((person) => person.id === +id);
  json.splice(indexToExclude);

  await fs.writeFile('./talker.json', JSON.stringify(json));

  res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;