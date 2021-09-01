const readFileTalker = require('../services/readFileTalker.js');

async function getAllTalkers(_req, res, next) {
  try {
    const getTalkers = await readFileTalker();
    res.status(200).json(getTalkers);
    } catch (e) {
      next(e);
    }
}

module.exports = getAllTalkers;
