const { StatusCodes } = require('http-status-codes');
const file = require('../../internal/file');

module.exports = async function (_, res, next) {
    try {
        const talkers = await file.read();
        
        return res.status(StatusCodes.OK).json(talkers);
    } catch (err) {
        next(err);
    }
};