const fs = require('fs/promises');

const editTalker = async (req, res) => {
  const { id } = req.params;

  const json = JSON.parse(await fs.readFile('./talker.json'));

  const indexFinder = json.findIndex((element) => element.id === id);
  const newTalker = { id: +id, ...req.body };

  json.splice(indexFinder, 1, newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(json));

  res.status(200).json(newTalker);
};

module.exports = editTalker;