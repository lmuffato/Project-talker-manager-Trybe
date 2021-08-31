const PASSWORD_MANDATORY = { message: 'O campo "password" é obrigatório' };
const INVALID_PASSWORD = { message: 'O "password" deve ter pelo menos 6 caracteres' };

const validatePassword = (req, res, next) => {
    const { password } = req.body;
    if (!password || password.length === 0) return res.status(400).json(PASSWORD_MANDATORY);
    if (password.length < 6) return res.status(400).json(INVALID_PASSWORD);
    next();
};

module.exports = validatePassword;