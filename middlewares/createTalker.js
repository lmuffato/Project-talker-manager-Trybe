const readFileTalker = require('../services/readFileTalker.js');
const writeInTalker = require('../services/writeInTalker.js');

async function createTalker(req, res, next) {
  const { name, age, watchedAt, rate } = req.body;
  const newData = {
    name,
    age, 
    talk: {
      watchedAt,
      rate,
    },
  };

  const originalDatas = await readFileTalker();
  const updateDatas = originalDatas.push(newData);
  writeInTalker(updateDatas);
}

module.exports = createTalker;
