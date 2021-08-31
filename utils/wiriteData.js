const fs = require('fs').promises;

const readData = require('./readData');

const writeData = async (data) => {
    const talkerArr = await readData();
    const obj = { ...data };
    obj.id = talkerArr.length + 1;
    talkerArr.push(obj);
    try {
        await fs.writeFile('./talker.json', JSON.stringify(talkerArr));
        return obj;
    } catch (e) {
        return false;
    }
};

module.exports = writeData;