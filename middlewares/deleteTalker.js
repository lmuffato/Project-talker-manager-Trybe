const readFileTalker = require('../services/readFileTalker.js');
const writeInTalker = require('../services/writeInTalker.js');

async function deleteTalker(req, res) {
  const { id } = req.params;
  const originalDatas = await readFileTalker();
  let index;
  originalDatas.forEach((e, i) => {
    if (e.id === +id) {
       index = i;
    }
  });
  const uptadeDatas = [...originalDatas];
  uptadeDatas.splice(index, 1);
  await writeInTalker(uptadeDatas);
  res.status(200).json(
    { message: 'Pessoa palestrante deletada com sucesso' },
  );
}

module.exports = deleteTalker;
