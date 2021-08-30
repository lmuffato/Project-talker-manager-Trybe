const fs = require('fs');
const path = require("path");
const { StatusCodes } = require('http-status-codes');

module.exports = async function (_, res, next) {
    try {
        const absolutePath = path.resolve('./talker.json');
        fs.createReadStream(absolutePath).pipe(res)
    } catch (err) {
        next(err);
    }
};