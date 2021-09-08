const fs = require('fs').promises;
const readContentFile = require('./readContentFile');

const editionTalker = async (id, action, content, path) => {
  const talkersArray = await readContentFile(path);
  if (id !== '' && action === 'edition') {
    const indexTalkerForEditing = talkersArray.findIndex((talker) => talker.id === +id);
    talkersArray[+indexTalkerForEditing] = content;
  }
  return talkersArray;
};

// const deleteTalker = async (id, action, content, path) => {
//   const talkersArray = await readContentFile(path);
//   if (id !== '' && action === 'delete') {
//     const indexTalkerForDelete = talkersArray.filter((talker) => talker.id !== +id);
//     talkersArray[+indexTalkerForDelete] = content;
//   }
//   return talkersArray;
// };

const writeContentFile = async (path, content, id = '') => {
  const talkersArray = await readContentFile(path);

  if (id !== '') {
    const indexTalkerForEditing = talkersArray.findIndex((talker) => talker.id === +id);
    talkersArray[+indexTalkerForEditing] = content;
  } else {
    talkersArray.push(content);
  }
  try {
    await fs.writeFile(path, JSON.stringify(talkersArray));
    return content;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

module.exports = writeContentFile;
