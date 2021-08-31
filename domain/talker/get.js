const { StatusCodes } = require('http-status-codes');
const file = require('../../internal/file');

module.exports = async function (req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        
        const talkers = await file.read();
        const found = talkers.find((talker) => talker.id === id);
        
        if (!found) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Pessoa palestrante não encontrada',
            });
        }

        return res.status(StatusCodes.OK).json(found);
    } catch (err) {
        next(err);
    }
};