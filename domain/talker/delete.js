const { StatusCodes } = require('http-status-codes');
const file = require('../../internal/file');

module.exports = async function (req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);

        const talkers = await file.read();
        const found = talkers.findIndex((talker) => talker.id === id);
        
        if (found === -1) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Palestrante não encontrado.',
            });
        }

        talkers.splice(found, 1);
        
        await file.overwrite(talkers);

        return res.status(StatusCodes.NO_CONTENT).end();
    } catch (err) {
        next(err);
    }
};