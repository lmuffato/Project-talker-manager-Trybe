const { HTTP_OK_STATUS, NOT_FOUND, FOUR_HUNDRED } = require('./consts');

const generateToken = () => {
    const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
    const b = [];
    const length = 16;  
    for (let i = 0; i < length; i += 1) {
        const j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join('');
};

const tokenValidate = (req, res, next) => {
    const { token } = req.body;
    if (!token || token.length() !== 16) {
        return res.status(NOT_FOUND).json({ message: 'Token inválido' });
    }
    res.status(HTTP_OK_STATUS).json({ token });
    next();
};

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const emailValidate = (req, res, next) => {
    const { email } = req.body;
    if (!email || email === '') { res.status(FOUR_HUNDRED).json({ message: 'O campo "email" é obrigatório' }); }
    if (!validateEmail(email)) {
        res.status(FOUR_HUNDRED).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

const passwordValidate = (req, res, next) => {
    const { password } = req.body;
    if (!password || password === '') { res.status(FOUR_HUNDRED).json({
        message: 'O campo "password" é obrigatório' }); }
    if (password.length < 6) { res.status(FOUR_HUNDRED).json({
        message: 'O campo "password"deve ter pelo menos 6 caracteres' }) };
    next();
};

module.exports = { generateToken, tokenValidate, emailValidate, passwordValidate };
