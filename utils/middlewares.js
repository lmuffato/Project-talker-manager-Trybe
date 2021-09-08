const { FOUR_HUNDRED, FOUR_HUNDRED_ONE } = require('./consts');

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
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(FOUR_HUNDRED_ONE).json({ message: 'Token não encontrado' });
    }
    if (authorization.length < 16) {
        return res.status(FOUR_HUNDRED_ONE).json({ message: 'Token inválido' });
    }
    next();
};

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validateDate(date) {
    const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    return re.test(String(date).toLowerCase());
}

const emailValidate = (req, res, next) => {
    const { email } = req.body;
    if (!email || email === '') {
        res.status(FOUR_HUNDRED).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!validateEmail(email)) {
        res.status(FOUR_HUNDRED).json({
            message: 'O "email" deve ter o formato "email@email.com"',
        });
    }
    next();
};

const passwordValidate = (req, res, next) => {
    const { password } = req.body;
    if (!password || password === '') {
        res.status(FOUR_HUNDRED).json({
        message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        res.status(FOUR_HUNDRED).json({
        message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

const nameValidate = (req, res, next) => {
    const { name } = req.body;
    if (!name || name === '') {
        res.status(FOUR_HUNDRED).json({ message: 'O campo "name" é obrigatório' });
    } if (name.length < 3) {
        res.status(FOUR_HUNDRED).json({ 
            message: 'O "name" deve ter pelo menos 3 caracteres',
        });
}
    next();
};

const ageValidate = (req, res, next) => {
    const { age } = req.body;
    if (!age || age === '') {
        res.status(FOUR_HUNDRED).json({ message: 'O campo "age" é obrigatório' });
    } if (age < 18) {
        res.status(FOUR_HUNDRED).json({
            message: 'A pessoa palestrante deve ser maior de idade', 
    });
}
    next();
};

const talkValidate = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        res.status(FOUR_HUNDRED).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
        });
    }
    next();
};

const rateValidate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
    if (!rate) {
        res.status(FOUR_HUNDRED).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
        });
    } if ([1, 2, 3, 4, 5].includes(rate) === false) {
        res.status(FOUR_HUNDRED).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
}
    next();
};

const watchedAtValidate = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    if (!watchedAt) {
        res.status(FOUR_HUNDRED).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
        });
    }
    if (!validateDate(watchedAt)) {
        res.status(FOUR_HUNDRED).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
};

module.exports = {
    generateToken,
    tokenValidate,
    emailValidate,
    passwordValidate,
    nameValidate,
    ageValidate,
    talkValidate,
    watchedAtValidate,
    rateValidate,
};
