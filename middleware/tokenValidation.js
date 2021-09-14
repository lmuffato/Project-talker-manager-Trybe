module.exports = (req, res, next) => {
const { authorization: token } = req.headers;
console.log(token);
if (!token) {
    return res.status(401).json({
        message: 'Token não encontrado',
    });
}
if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
}

next();
};