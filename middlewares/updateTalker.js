const { readFile, writeFileTalker } = require('../fs-util');

async function updateTalker(req, res) {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const arrTalkers = await readFile();
  const talkerToEdit = {
    id: Number(id),
    name,
    age,
    talk,
  };
  arrTalkers.filter((talker) => Number(talker.id) !== Number(id));
  arrTalkers.push(talkerToEdit);

  await writeFileTalker(arrTalkers);
  return res.status(200).json(talkerToEdit);
}

module.exports = updateTalker;
