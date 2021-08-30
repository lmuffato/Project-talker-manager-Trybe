const val = require('../../internal/validate');
const { StatusCodes } = require('http-status-codes');

module.exports = async function validate(req, res, next) {
    try {
        const { email, password } = req.body
    
        if (!email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'O campo "email" é obrigatório'
            });
        }
    
        if (!password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'O campo "password" é obrigatório'
            });
        }
        
        if (!val.isValidEmail(email)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'O "email" deve ter o formato "email@email.com"'
            });
        }
    
        if (!val.isValidPassword(password)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'O "password" deve ter pelo menos 6 caracteres'
            });
        }

        next()
    } catch(err) {
        next(err)
    }
};