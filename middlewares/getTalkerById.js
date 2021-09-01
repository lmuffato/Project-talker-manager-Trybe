const readFileTalker = require('../services/readFileTalker.js');

async function getTalkerById(req, res, next) {
  const { id } = req.params;
  try {
    const getTalkers = await readFileTalker();
    const talker = getTalkers.find((t) => t.id === parseInt(id, 10));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talker);
    } catch (e) {
      next(e);
    }
}

module.exports = getTalkerById;
