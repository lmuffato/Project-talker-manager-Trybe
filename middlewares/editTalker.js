const fs = require('fs').promises;

const {
  checkAuth, checkName, checkAge, checkTalkWatchDate, checkTalkRate, checkTalk,
 } = require('./checkTalker');

async function checkRate(req, res) {
  const { talk } = req.body;
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
}

const editTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  await checkAuth(req, res);
  await checkName(req, res);
  await checkAge(req, res);
  await checkTalk(req, res);
  await checkRate(req, res);
  await checkTalkWatchDate(req, res);
  await checkTalkRate(req, res);
  try {
    const talkersList = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
    const editedTalker = { id: Number(id), name, age, talk };
    talkersList[Number(id)] = editedTalker;
    await fs.writeFile('./talker.json', JSON.stringify(talkersList));
    res.status(200).json(editedTalker);
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = editTalker;
