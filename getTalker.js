const { readFile } = require('fs').promises;

const fileTalkers = './talker.json';
const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

const readFileTalker = () => readFile(fileTalkers, 'utf-8')
  .then((data) => JSON.parse(data));

const getTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await readFileTalker();

  const talke = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (!id) {
    return res.status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  res.status(HTTP_OK_STATUS).json(talke);
};

module.exports = getTalker;