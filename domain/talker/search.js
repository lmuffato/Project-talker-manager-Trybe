const { StatusCodes } = require('http-status-codes');
const file = require('../../internal/file');

module.exports = async function (req, res, next) {
    try {
        const { q } = req.query;
        if (!q) {
            return next();
        }

        const talkers = await file.read();
        const filtered = talkers.filter((talker) => talker.name.includes(q));

        return res.status(StatusCodes.OK).json(filtered);
    } catch (err) {
        next(err);
    }
};