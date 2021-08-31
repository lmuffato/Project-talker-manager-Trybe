const fs = require('fs');
const path = require('path');
const { StatusCodes } = require('http-status-codes');

module.exports = async function (_, res, next) {
    try {
        const absolutePath = path.resolve('./talker.json');
        const data = await fs.promises.readFile(absolutePath);

        const talkers = JSON.parse(data);
        res.status(StatusCodes.OK).json(talkers);
    } catch (err) {
        next(err);
    }
};