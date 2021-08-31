const fs = require('fs');
const path = require('path');

const filePath = () => path.resolve('./talker.json');

const read = async () => {
    const data = await fs.promises.readFile(filePath());

    return JSON.parse(data);
};

const overwrite = async (talkers) => {
    await fs.promises.writeFile(
        filePath(),
        JSON.stringify(talkers),
    );
};

module.exports = {
    read,
    overwrite,
};