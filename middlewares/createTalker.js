const readFileTalker = require('../services/readFileTalker.js');
const writeInTalker = require('../services/writeInTalker.js');

async function createTalker(req, res) {
  const { name, age, talk } = req.body;
  const originalDatas = await readFileTalker();
  const newData = {
    id: originalDatas.length + 1,
    name,
    age, 
    talk,
  };
  const updateDatas = [...originalDatas, newData];
  await writeInTalker(updateDatas);
  res.status(201).json(newData);
}

module.exports = createTalker;
