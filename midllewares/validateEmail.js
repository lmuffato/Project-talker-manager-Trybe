const EMAIL_MANDATORY = { message: 'O campo "email" é obrigatório' };

const INVALID_EMAIL = { message: 'O "email" deve ter o formato "email@email.com"' };

const validateEmail = (esq, res, next) => {
    const { email } = esq.body;
    if (!email || email.length === 0) return res.status(400).json(EMAIL_MANDATORY);
    if (!email.includes('@')) return res.status(400).json(INVALID_EMAIL);
    if (!email.endsWith('.com')) return res.status(400).json(INVALID_EMAIL);
    next();
};

module.exports = validateEmail;