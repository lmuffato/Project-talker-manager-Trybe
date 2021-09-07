const fsAsync = require('fs').promises;
const readJson = require('./readJson');

async function createTalker(req, res) {
  try {
    const { talk } = req.body;
    const newTalker = { name: req.body.name, age: req.body.age, talk };
    const array = await readJson();
    const newArray = [...JSON.parse(array), newTalker];
    await fsAsync.writeFile('./talker.json', JSON.stringify(newArray));
    return res.status(201).json(JSON.parse(array));
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = createTalker;
