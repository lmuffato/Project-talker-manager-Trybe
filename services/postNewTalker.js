const getTalkers = require('./getTalkers');
const { writeFile } = require('fs').promises;

const postNewTalker = async (talker) => {
  const oldArrTalkers = await getTalkers();
  const newTalker = { ...talker, id: oldArrTalkers.length + 1 }
  const NewArrTalkers = [...oldArrTalkers, newTalker]
  const toWrite = await JSON.stringify(NewArrTalkers, null, 2);
  await writeFile('./talker.json', toWrite);
  return newTalker;
};

module.exports = postNewTalker;