const fs = require('fs');
const path = require("path");
const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../errors/client');

module.exports = async function (req, res, next) {
    try {


        // const absolutePath = path.resolve('./talker.json');

        // readStream = fs.readFile(absolutePath, (err, data) => {
        //     if (err) {
        //         res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        //     } else {
        //         const talkers = JSON.parse(data);
        //         res.status(StatusCodes.OK).json(talkers);
        //     }
        // })

    } catch (err) {
        next(err);
    }
};