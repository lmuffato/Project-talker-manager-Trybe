const readFileTalker = require('../services/readFileTalker.js');
const writeInTalker = require('../services/writeInTalker.js');

async function createTalker(req, res) {
  const { name, age, talk } = req.body;
  const newData = {
    name,
    age, 
    talk,
  };

  const originalDatas = await readFileTalker();
  const updateDatas = originalDatas.push(newData);
  await writeInTalker(updateDatas);
  res.status(201).json(newData);
}

module.exports = createTalker;
