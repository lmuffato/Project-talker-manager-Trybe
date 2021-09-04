const fs = require('fs').promises;

const {
  checkAuth, checkAge, checkName, checkTalkWatchDate, checkTalkRate,
} = require('./checkTalker');

async function createTalker(req, res) {
  checkAuth(req, res);
  checkName(req, res);
  checkAge(req, res);
  checkTalkWatchDate(req, res);
  checkTalkRate(req, res);
  const { name, age, talk } = req.body;
  const talkersList = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
  const newTalker = {
    id: talkersList.length + 1,
    name,
    age,
    talk,
  };
  talkersList.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talkersList));
  res.status(201).json(newTalker);
}

module.exports = createTalker;
