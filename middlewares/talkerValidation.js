// primeiro: validar token
const verifiedToken = (req, res, next) => {
    const token = req.headers.authorization;
    const conditionRegex = !/^[a-zA-Z0-9]{16}$/;

    if (!token) {
        return res.status(401).json({ message: 'Token não encontrado' }); 
    }
    
    if (!token || conditionRegex.test(token)) {
        return res.status(401).json({ message: 'Token inválido' }); 
    }

    next();
};

const verifiedName = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }

    next();
};

module.exports = { verifiedToken, verifiedName };