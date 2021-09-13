const fs = require('fs');

const talker = 'talker.json';

function readFile() {
  const data = fs.readFileSync(talker, 'utf-8');

  return JSON.parse(data);
}

function addTalker(bodyTalker) {
  const data = readFile();

  const newId = data.reduce((lastId, { id }) => {
    if (lastId === id) return lastId + 1;
    return id;
  }, 1);

  const newTalker = { ...bodyTalker, id: newId };
  data.push(newTalker);

  fs.writeFileSync(talker, JSON.stringify(data));

  return newId;
}

function updateTalker(bodyTalker) {
  const data = readFile();
  const dataUpdated = data.map((talkerObj) => {
    if (talkerObj.id === bodyTalker.id) {
      return bodyTalker;
    }

    return talkerObj;
  });

  fs.writeFileSync(talker, JSON.stringify(dataUpdated));
}

function deleteTalker(talkerId) {
  const data = readFile();
  const newData = data.filter(({ id }) => id !== talkerId);

  console.log(data);
  console.log(newData);

  fs.writeFileSync(talker, JSON.stringify(newData));
}

module.exports = {
  readFile,
  addTalker,
  updateTalker,
  deleteTalker,
};
