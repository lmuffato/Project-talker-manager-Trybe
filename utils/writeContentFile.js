const fs = require('fs').promises;
const readContentFile = require('./readContentFile');

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
