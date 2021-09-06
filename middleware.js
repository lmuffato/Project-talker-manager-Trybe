const emailValidate = async (req, res, next) => {
        const { email } = req.body;
        if (!email && email === '') {
            return res.status(400).json({ message: 'O campo "email" é obrigatório' });
        }
        if (!(email.includes('@') && email.includes('.com'))) {
            return res.status(400).json({ 
                message: 'O "email" deve ter o formato "email@email.com"' });
          }
        next();
};
const passwordValidate = async (req, res, next) => {
    const { password } = req.body;

    if (!password || password === '') {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

module.exports = {
    emailValidate,
    passwordValidate,
};