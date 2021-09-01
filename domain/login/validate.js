const { StatusCodes } = require('http-status-codes');
const val = require('../../internal/validate');

module.exports = {
    validateEmail,
    validatePassword,
};

async function validateEmail(req, res, next) {
    try {
        const { email } = req.body;
    
        if (!email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'O campo "email" é obrigatório',
            });
        }
            
        if (!val.isValidEmail(email)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'O "email" deve ter o formato "email@email.com"',
            });
        }
    
        next();
    } catch (err) {
        next(err);
    }
}

async function validatePassword(req, res, next) {
    try {
        const { password } = req.body;
        
        if (!password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'O campo "password" é obrigatório',
            });
        }    
    
        if (!val.isValidPassword(password)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'O "password" deve ter pelo menos 6 caracteres',
            });
        }

        next();
    } catch (err) {
        next(err);
    }
}