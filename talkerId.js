const fs = require('fs/promises');

const talkerId = async (req, res) => {
  const { id } = req.params;

  const readFile = JSON.parse(await fs.readFile('talker.json'));
  const talkerID = readFile.find((element) => element.id === Number(id));

  if (!talkerID) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } return res.status(200).json(talkerID);
};

module.exports = talkerId;