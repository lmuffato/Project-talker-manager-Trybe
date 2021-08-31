const { readFile, writeFileTalker } = require('../fs-util');

async function updateTalker(req, res) {
  const { name, age, talk } = req.body;
  const arrTalkers = await readFile();
  let talkerToEdit = arrTalkers.find((t) => name === t.name);
  talkerToEdit = {
    name,
    age,
    talk,
  };
  const talkerToEditIndex = arrTalkers.findIndex((tlkr) => tlkr.name === name);
  arrTalkers.splice(talkerToEditIndex, 1, talkerToEdit);

  await writeFileTalker(arrTalkers);
  return res.status(200).json(talkerToEdit);
}

module.exports = updateTalker;
