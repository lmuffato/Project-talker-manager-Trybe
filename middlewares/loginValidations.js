// primeiro: validar token
const verifiedToken = (req, res, next) => {
    const token = req.headers.authorization;
    const conditionRegex = !/^[a-zA-Z0-9]{16}$/;
    
    if (token && conditionRegex.test(token)) {
        return res.status(200).json({ token }); 
    }

    next();
};

const verifiedEmail = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' }); 
    }

    if (!email || !email.includes('@') || !email.includes('.com')) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    next();
};

module.exports = { verifiedToken, verifiedEmail };