// 2 - Crie o endpoint GET /talker/:id

const { readFile } = require('fs').promises;

const getTalkersById = async (req, res) => {
  const { id } = req.params;

  const talkersFile = await readFile('./talker.json');
  const talkers = JSON.parse(talkersFile);

  const idTalker = talkers.find((talk) => talk.id === Number(id));

  // if (!idTalker) {
  //   return res.status(404)
  //     .json({ message: 'Pessoa palestrante não encontrada' });
  // }
  // return res.status(200).json(idTalker);

  return (
    idTalker
      ? res.status(200).json(idTalker)
      : res.status(404).send({ message: 'Pessoa palestrante não encontrada' })
  );
};

module.exports = getTalkersById;
