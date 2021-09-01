const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const updateTalkerById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    const data = await readFile('./talker.json');
    const result = JSON.parse(data);

    const editedTalker = { name, age, talk, id: +id };
    const filteredTalkers = result.filter((talker) => talker.id !== +id);
    filteredTalkers.push(editedTalker);

    await writeFile('talker.json', JSON.stringify(filteredTalkers));
    return res.status(200).json(editedTalker);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = updateTalkerById;