const readFileTalker = require('../services/readFileTalker.js');
const writeInTalker = require('../services/writeInTalker.js');

async function editTalker(req, res) {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const originalDatas = await readFileTalker();
  let index;
  originalDatas.forEach((e, i) => {
    if (e.id === +id) {
       index = i;
    }
  });
  const updateData = {
    id: index,
    name,
    age, 
    talk,
  };
  originalDatas[index] = updateData;
  await writeInTalker(originalDatas);
  res.status(200).json(updateData);
}

module.exports = editTalker;
