const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const getTalkerById = async (req, res) => {
  try {
    const data = await readFile('./talker.json');
    const result = JSON.parse(data);

    const { id } = req.params;
    const talker = result.find((talkers) => talkers.id === +id);

    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(talker);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = getTalkerById;