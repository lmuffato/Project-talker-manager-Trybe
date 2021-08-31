const fs = require('fs/promises');
const readData = require('./readData');

const updateOne = async (talker, id) => {
    const newArr = await readData();
    const filterArr = newArr.filter((element) => +element.id !== +id);
    const idToNumber = +id;
    const updatedTalker = { ...talker, id: idToNumber };
    filterArr.push(updatedTalker);
    try {
        await fs.writeFile('./talker.json', JSON.stringify(filterArr));
        console.log(updatedTalker);
        return updatedTalker;
    } catch (e) {
        return false;
    }
};

module.exports = updateOne;