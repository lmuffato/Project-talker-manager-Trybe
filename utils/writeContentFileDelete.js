const fs = require('fs').promises;
const readContentFile = require('./readContentFile');

// const deleteTalker = async (id, action, content, path) => {
//   const talkersArray = await readContentFile(path);
//   if (id !== '' && action === 'delete') {
//     const indexTalkerForDelete = talkersArray.filter((talker) => talker.id !== +id);
//     talkersArray[+indexTalkerForDelete] = content;
//   }
//   return talkersArray;
// };

const writeContentFileDelete = async (path, content, id) => {
  const talkersArray = await readContentFile(path);

  const indexTalkerForDelete = talkersArray.filter((talker) => talker.id !== +id);

  try {
    await fs.writeFile(path, JSON.stringify(indexTalkerForDelete));
    return content;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

module.exports = writeContentFileDelete;
