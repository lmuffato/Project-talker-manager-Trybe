const MANDATORY_AGE = { message: 'O campo "age" é obrigatório' };
const INVALID_AGE = { message: 'A pessoa palestrante deve ser maior de idade' };

const validateTalkerAge = (req, res, next) => {
    const { age } = req.body;
    if (!age || age.length === 0) return res.status(400).json(MANDATORY_AGE);
    if (+age < 18) return res.status(400).json(INVALID_AGE);
    next();
};

module.exports = validateTalkerAge;