const getTalkers = require('./getTalkers');
const { writeFile } = require('fs').promises;

const testTalker = {
  id: 1,
  name: "Danielle Santos",
  age: 56,
  talk: {
    watchedAt: "22/10/2019",
    rate: 5
  }
}


const postNewTalker = async (talker) => {
  const oldArrTalkers = await getTalkers();
  const newTalker = { ...talker, id: oldArrTalkers.length + 1 }
  const NewArrTalkers = [...oldArrTalkers, newTalker]
  const toWrite = await JSON.stringify(NewArrTalkers, null, 2);
  await writeFile('./talker.json', toWrite);
  return newTalker;
};

postNewTalker(testTalker);

module.exports = postNewTalker;