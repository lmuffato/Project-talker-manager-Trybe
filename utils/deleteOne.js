const fs = require('fs').promises;
const readData = require('./readData');

const deleteOne = async (id) => {
    const talkersArr = await readData();
    const filteredArr = talkersArr.filter((element) => +element.id !== +id);
    try {
        await fs.writeFile('./talker.json', JSON.stringify(filteredArr));
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = deleteOne;