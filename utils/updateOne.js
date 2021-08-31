const fs = require('fs/promises');
const readData = require('./readData');

const updateOne = async (talker, id) => {
    const newArr = await readData();
    const filterArr = newArr.filter((element) => element.id !== id);
    const updatedTalker = { ...talker, id };
    filterArr.push(updateOne);
    try {
        await fs.writeFile('./talker.json');
        return updatedTalker;
    } catch (e) {
        return false;
    }
};

module.exports = updateOne;