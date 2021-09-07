const fsAsync = require('fs').promises;
const readJson = require('./readJson');

async function createTalker(req, res) {
  try {
    const { talk } = req.body;
    const { name, age } = req.body;
    const array = await readJson();
    const newArray = JSON.parse(array);
    const newId = newArray.length + 1;
    const newTalker = { id: newId, name, age, talk };
    newArray.push(newTalker);
    await fsAsync.writeFile('./talker.json', JSON.stringify(newArray));
    return res.status(201).json(newTalker);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = createTalker;
