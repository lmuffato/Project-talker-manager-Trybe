const MANDATORY_NAME = { message: 'O campo "name" é obrigatório' };
const INVALID_NAME = { message: 'O "name" deve ter pelo menos 3 caracteres' };

const validateTalkerName = (req, res, next) => {
    const { name } = req.body;
    if (!name || name.length === 0) return res.status(400).json(MANDATORY_NAME);
    if (name.length < 3) return res.status(400).json(INVALID_NAME);
    next();
};

module.exports = validateTalkerName;