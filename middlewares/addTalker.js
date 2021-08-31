const { readFile, writeFileTalker } = require('../fs-util');

async function addTalker(req, res) {
  const { name, age, talk } = req.body;
  const arrTalkers = await readFile();
  const talkerLength = arrTalkers.length;
  const newTalker = {
    id: talkerLength + 1,
    name,
    age,
    talk,
  };
  arrTalkers.push(newTalker);
  await writeFileTalker(arrTalkers);
  return res.status(201).json(newTalker);
}

module.exports = addTalker;
