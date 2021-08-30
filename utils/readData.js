const fs = require('fs/promises');

const readData = async () => {
    const rawData = await fs.readFile('./talker.json', 'utf-8');
    const talkerArr = await JSON.parse(rawData);
    return talkerArr;
};

module.exports = readData;
