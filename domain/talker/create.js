const { StatusCodes } = require('http-status-codes');
const file = require('../../internal/file');

module.exports = async function (req, res, next) {
    try {
        const talkers = await file.read();

        const newTalker = {
            id: talkers.length + 1,
            ...req.body,
        };

        const updated = [...talkers, newTalker];
        await file.overwrite(updated);

        return res.status(StatusCodes.CREATED).json(newTalker);
    } catch (err) {
        next(err);
    }
};