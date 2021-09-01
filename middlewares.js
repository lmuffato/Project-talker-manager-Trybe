const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
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
    next();
};

const validateTalker = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
        return res.status(400)
        .json({ 
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    next();
};

const validateTalkAtributs = (req, res, next) => {
    const { talk } = req.body;
    const dataFormat = /^\d{2}\/\d{2}\/\d{4}$/;
    const dateIsCorrect = dataFormat.test(talk.watchedAt);
    if (!dateIsCorrect) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (!(Number(talk.rate) >= 1 && Number(talk.rate) <= 5)) {
       return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

module.exports = {
    validateToken,
    validateName,
    validateAge,
    validateTalker,
    validateTalkAtributs,
};