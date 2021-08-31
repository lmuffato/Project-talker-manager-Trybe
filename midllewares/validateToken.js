const tokenNotFound = { message: 'Token não encontrado' };
const INVALID_TOKEN = { message: 'Token inválido' };

const validateToken = (req, res, next) => {
    console.log(req.headers);
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json(tokenNotFound);
    if (authorization.length !== 16) return res.status(401).json(INVALID_TOKEN);
    next();
};

module.exports = validateToken;