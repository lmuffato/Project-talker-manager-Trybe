const fs = require('fs').promises;

async function getAllTalkers() {
  const allTalkers = await fs.readFile('./talker.json');
  return JSON.parse(allTalkers);
}

async function getTalkerById(talkerId) {
  const allTalkers = await fs.readFile('./talker.json');
  const allTalkersData = JSON.parse(allTalkers);
  const talkerById = allTalkersData.find((t) => t.id === parseInt(talkerId, 10));
  return talkerById;
}

module.exports = {
  getAllTalkers,
  getTalkerById,
};