const readFileTalker = require('../services/readFileTalker.js');

async function searchTalker(req, res) {
  const { q } = req.query;
  const originalDatas = await readFileTalker();
  const filteredtalkers = originalDatas
    .filter((t) => t.name.includes(q) || t.name.includes(q.toLowerCase()));
  
  let resp;
  if (resp === undefined) return res.status(200).json(originalDatas);
  res.status(200).json(filteredtalkers);
}

module.exports = searchTalker;
