const fs = require('fs').promises;
const readContentFile = require('./readContentFile');

const writeContentFileEdition = async (path, content, id) => {
  const talkersArray = await readContentFile(path);
  const indexTalkerForEditing = talkersArray.findIndex((talker) => talker.id === +id);
  talkersArray[+indexTalkerForEditing] = content;

  try {
    await fs.writeFile(path, JSON.stringify(talkersArray));
    return content;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

module.exports = writeContentFileEdition;
