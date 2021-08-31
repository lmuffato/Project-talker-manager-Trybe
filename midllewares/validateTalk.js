const INVALID_TALK = { 
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || Object.keys(talk).length !== 2) return res.status(400).json(INVALID_TALK);
    const { watchedAt, rate } = talk;    
    if (watchedAt.length === 0 || rate.length === 0) return res.status(400).json(INVALID_TALK);
    next();
};

module.exports = validateTalk;