const { FOUR_OH_ONE, FOUR_HUNDRED } = require('../consts');

function validateDate(date) {
    const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    return re.test(String(date).toLowerCase());
}

const tokenValid = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(FOUR_OH_ONE).json({ message: 'Token não encontrado' });
    } if (authorization.length !== 16) {
        return res.status(FOUR_OH_ONE).json({ message: 'Token inválido' });
    }
    next();
};

const nameValid = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(FOUR_HUNDRED).json({ message: 'O campo "name" é obrigatório' });
    } if (name.length < 3) {
        return res.status(FOUR_HUNDRED).json({ 
            message: 'O "name" deve ter pelo menos 3 caracteres',
        });
}
    next();
};

const ageValid = (req, res, next) => {
    const { age } = req.body;
    if (!age || age === '') {
        return res.status(FOUR_HUNDRED).json({ message: 'O campo "age" é obrigatório' });
    } if (age < 18) {
        return res.status(FOUR_HUNDRED).json({
            message: 'A pessoa palestrante deve ser maior de idade', 
    });
}
    next();
};

const talkValid = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(FOUR_HUNDRED).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
        });
    }
    next();
};

const rateValid = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
    if (rate < 1 || rate > 5) {
        return res.status(FOUR_HUNDRED).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
    }
    if (!rate) {
        return res.status(FOUR_HUNDRED).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
        });
    } 
    next();
};

const watchedAtValid = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    if (!watchedAt) {
        return res.status(FOUR_HUNDRED).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }
    if (!validateDate(watchedAt)) {
        return res.status(FOUR_HUNDRED).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
};

module.exports = { tokenValid, nameValid, ageValid, talkValid, watchedAtValid, rateValid };