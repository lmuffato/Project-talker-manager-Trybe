const validaEmail = (req, res, next) => {
    const { email } = req.body;
    if (email === '' || !email) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!(email.includes('@') && email.includes('.com'))) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

const validaPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};
// https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
function generateToken(n) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < n; i += 1) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

module.exports = {
    validaEmail,
    validaPassword,
    generateToken,
};
