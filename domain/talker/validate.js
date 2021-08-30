const { StatusCodes } = require('http-status-codes');

module.exports = async function validate(req, res, next) {
    try {
        const talker = req.body
    
        if (!talker.name) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'O campo "name" é obrigatório',
            });
        }

        if (talker.name.length < 3) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'O "name" deve ter pelo menos 3 caracteres',
            });
        }

        

        next()
    } catch(err) {
        next(err)
    }
};