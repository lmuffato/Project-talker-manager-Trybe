const { writeFile } = require('fs').promises;
const getTalkers = require('./getTalkers');

const putTalker = async (updatedTalker, id) => {
  const ArrTalkers = await getTalkers();
  const toUpdate = ArrTalkers.findIndex((ele) => ele.id === parseInt(id, 10));
  console.log(toUpdate);
  ArrTalkers[toUpdate] = { id, ...updatedTalker };
  console.log(ArrTalkers);
  const toWrite = await JSON.stringify(ArrTalkers, null, 2);
  await writeFile('./talker.json', toWrite);
  return ArrTalkers[toUpdate];
};

module.exports = putTalker;
