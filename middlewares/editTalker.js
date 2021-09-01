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
  const updateData = { id: index + 1,
    name,
    age, 
    talk,
  };
  const uptadeDatas = [...originalDatas];
  uptadeDatas[index] = updateData;
  await writeInTalker(uptadeDatas);
  res.status(200).json(updateData);
}

module.exports = editTalker;
