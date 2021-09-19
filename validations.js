const { FOUR_HUNDRED } = require('./consts');

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

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const emailValid = (req, res, next) => {
    const { email } = req.body;
    if (!email || email === '') {
        return res.status(FOUR_HUNDRED).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!validateEmail(email)) {
        return res.status(FOUR_HUNDRED).json({
            message: 'O "email" deve ter o formato "email@email.com"',
        });
    }
    next();
};

const passValid = (req, res, next) => {
    const { password } = req.body;
    if (!password || password === '') {
        return res.status(FOUR_HUNDRED).json({
        message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(FOUR_HUNDRED).json({
        message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

module.exports = {
    passValid,
    emailValid,
    generateToken,
};
