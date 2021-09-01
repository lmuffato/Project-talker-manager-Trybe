const fs = require('fs').promises;

const getAllTalkers = async () => {
    const allTalkers = await fs.readFile('./talker.json');
    return JSON.parse(allTalkers);
};

module.exports = getAllTalkers;