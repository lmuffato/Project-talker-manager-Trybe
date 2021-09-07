const login = (req, res) => {
    const { token } = req.headers;
    res.status(200).json({ token });
};

const generateToken = (req, _res, next) => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = upper.toLowerCase();
    const numbers = '1234567890';
    const chars = numbers.concat(lower, upper);
    let token = '';
    const TOKEN_LENGTH = 16;
    for (let i = 0; i < TOKEN_LENGTH; i += 1) {
        const rand = Math.floor(Math.random() * chars.length);
        token += chars[rand];
    }
    req.headers.token = token;
    return next();
};

const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^[a-z0-9]+@[a-z]+(\.[a-z]+)+$/;

    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }

    if (email.match(emailRegex)) {
        return next();
    }

    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
};

const validatePassword = (req, res, next) => {
    const { password } = req.body;
  
    if (!password) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
  
    if (password.length >= 6) {
      return next();
    }
  
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  };

module.exports = {
    login,
    generateToken,
    validateEmail,
    validatePassword,
};
