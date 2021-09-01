const fs = require('fs').promises;

const fileTalker = async () => {
    const file = await fs.readFile('talker.json');
    const arrayOfObejct = JSON.parse(file);
    return arrayOfObejct;
  };

module.exports = fileTalker;