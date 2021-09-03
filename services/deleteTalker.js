const { writeFile } = require('fs').promises;
const getTalkers = require('./getTalkers');

const deleteTalker = async (id) => {
  const ArrTalkers = await getTalkers();
  const newArr = ArrTalkers.filter((e) => e.id !== parseInt(id, 10));
  const toWrite = await JSON.stringify(newArr, null, 2);
  await writeFile('./talker.json', toWrite);
};

module.exports = deleteTalker;
