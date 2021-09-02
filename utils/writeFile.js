const fs = require('fs').promises;

const writeNewTalker = async (newTalker) => {
    await fs.writeFile('./talker.json', JSON.stringify(newTalker));
};

module.exports = writeNewTalker;