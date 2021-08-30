const { StatusCodes } = require('http-status-codes');
const errors = require('../errors/client');

module.exports = class AuthClient {
    constructor() { }

    authenticate = async (req, res, next) => {
        try {
            const token = req.headers.authorization;
    
            if (!token) { 
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: 'Token não encontrado',
                });
            }
    
            if (!validate(token)) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: 'Token inválido',
                });
            }
    
            next();
        } catch (err) {
            next(
                new errors.CustomError(
                    err.message,
                    StatusCodes.UNAUTHORIZED,
            ));
        }
    }
};

const validate = (token) => token.length === 16;