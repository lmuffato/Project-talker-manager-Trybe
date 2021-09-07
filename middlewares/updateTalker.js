const fsAsync = require('fs').promises;
const readJson = require('./readJson');

async function updateTalker(req, res) {
  try {
    const { id } = req.params;
    const { talk, name, age } = req.body;
    const array = JSON.parse((await readJson()));
    const index = array.findIndex((e) => e.id === parseInt(id, 10));
    if (index === -1) return res.status(404).json({ message: 'not found' });
    const editedTalker = { id: parseInt(id, 10), name, age, talk };
    array[index] = editedTalker;
    await fsAsync.writeFile('./talker.json', JSON.stringify(array));
    return res.status(200).json(editedTalker);
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = updateTalker;
