// Validation Functions

const regexDate = /^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/; 

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || authorization === '') {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    
    next();
};

const validateName = (req, res, next) => {
    const { name } = req.body;

    if (!name || name === '') {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    
    next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body;

    if (!age || age === '') {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (Number(age) < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    if (typeof (age) !== 'number') {
        return res.status(400).json({ message: 'Idade deve ser um número' });
    }
    next();
};

const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (talk === undefined || talk === '') {
        return res.status(400).json({ 
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    next();
};

const validateTalkDate = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;

    if (!watchedAt || watchedAt === '') {
        return res.status(400).json({ 
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }

    if (!regexDate.test(String(watchedAt))) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
};

const validateTalkRate = (req, res, next) => {
    const { talk: { rate } } = req.body;

    if (rate === undefined || rate === '') { // Exclamacao apenas em OBJETOS e STRING
        return res.status(400).json({ 
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    if (Number(rate) > 5 || Number(rate) < 1) {
        return res.status(400).json({ 
            message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

const validateIdFromURL = (req, res, next) => {
    const { id } = req.params;
    if (id === undefined || id > 4 || id < 1) {
        return res.send('ID INVALIDO');
    }

    next();
};

module.exports = {
    validateAge,
    validateName,
    validateTalk,
    validateTalkDate,
    validateTalkRate,
    validateToken,
    validateIdFromURL,
};