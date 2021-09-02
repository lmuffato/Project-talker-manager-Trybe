const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const deleteTalkerById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await readFile('./talker.json');
    const result = JSON.parse(data);
    const filteredTalkers = result.filter((talker) => talker.id !== +id);

    await writeFile('talker.json', JSON.stringify(filteredTalkers));
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = deleteTalkerById;