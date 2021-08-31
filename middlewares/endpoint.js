const fs = require('fs').promises;

const endpoint = async (req, res) => {
  const { id } = req.params;

  const talkers = await fs.readFile('./talker.json');
  const TalkerJSON = JSON.parse(talkers);

  const idTalker = TalkerJSON.find((talk) => talk.id === Number(id));

  if (!idTalker) {
    return res.status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(idTalker);
};

module.exports = endpoint;