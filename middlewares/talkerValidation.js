// primeiro: validar token
const verifiedToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token não encontrado' }); 
    }
    
    if (token.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' }); 
    }

    next();
};

const verifiedName = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }

    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    next();
};

const verifiedAge = (req, res, next) => {
    const { age } = req.body;

    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }

    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }

    next();
};

// https://www.regextester.com/99555 
const verifiedDate = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

    if (!regexDate.test(watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const verifiedRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;

    if (!((rate >= 1) && (rate <= 5))) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

const verifiedTalk = (req, res, next) => {
    const { talk } = req.body;
    
    if (!talk || !talk.rate || !talk.watchedAt) {
        return res.status(400)
        .json({ 
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
        });
    }

    next();
};

module.exports = { 
    verifiedToken,
    verifiedName,
    verifiedAge,
    verifiedTalk,
    verifiedDate,
    verifiedRate, 
};