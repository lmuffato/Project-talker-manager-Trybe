// 1. Crie o endpoint GET /talker
// Síncrono ou assíncrono? https://www.luiztools.com.br/post/node-js-6-dicas-do-modulo-file-system/#1

const { readFile } = require('fs').promises;

const getTalkers = async (_req, res) => {
  const talkersFile = await readFile('./talker.json');
  const talkers = JSON.parse(talkersFile);

  if (talkers.length === 0) return res.status(200).json([]);

  return res.status(200).json(talkers);

    // talkers.length === 0 ? res.status(200).json([]) : res.status(200).json(talkers);
};

module.exports = getTalkers;
