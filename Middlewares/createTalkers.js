const fs = require('fs').promises;

async function createTalkers(req, res) {
  const { name, age, talk } = req.body;
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  console.log(talkers);
  const arrTalkers = JSON.parse(talkers);
  const newTalker = {
    id: arrTalkers.length + 1,
    name,
    age,
    talk,
  };

  arrTalkers.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(arrTalkers));
 return res.status(201).json(newTalker);
}

module.exports = createTalkers;
