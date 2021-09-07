const fsAsync = require('fs').promises;
const readJson = require('./readJson');

async function createTalker(req, res) {
  const { talk } = req.body;
  try {
    const newTalker = { name: req.body.name, age: req.body.age, talk };
    const array = await readJson();
    const newArray = [...JSON.parse(array), newTalker];
    await fsAsync.writeFile('./talker.json', JSON.stringify(newArray));
    res.status(201).json(JSON.parse(array));
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = createTalker;
