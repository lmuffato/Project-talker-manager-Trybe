// Solução realizada com ajuda do Eduardo Costa - Turma 10-A
const readFile = require('./models/utils');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

const getTalkerId = async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile.readFileTalker();

  const talk = talkers.find((talker) => talker.id === Number(id));

  if (!talk) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).json(talk);
};

module.exports = getTalkerId;
