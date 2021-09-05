const fs = require('fs').promises;

async function getAllTalkers() {
  const allTalkers = await fs.readFile('./talker.json');
  if (!allTalkers) return [];
  return JSON.parse(allTalkers);
}

async function getTalkerById(talkerId) {
  const allTalkers = await fs.readFile('./talker.json');
  const allTalkersData = JSON.parse(allTalkers);
  const talkerById = allTalkersData.find((t) => t.id === parseInt(talkerId, 10));
  return talkerById;
}

async function updateTalkerList(updatedTalkerList) {
  await fs.writeFile('./talker.json', JSON.stringify(updatedTalkerList));
}

async function getTalkersByString(string) {
  const allTalkers = await fs.readFile('./talker.json');
  const allTalkersData = JSON.parse(allTalkers);
  const filteredTalkers = allTalkersData.filter(
    (talker) => talker.name.toLowerCase().includes(string),
  );
  return filteredTalkers;
}

module.exports = {
  getAllTalkers,
  getTalkerById,
  updateTalkerList,
  getTalkersByString,
};