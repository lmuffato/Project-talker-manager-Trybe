// Middleware para validação de email e senha
const midllewares = require('../midlleware');

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) { return res.status(400).json({ message: 'O campo "email" é obrigatório' }); }
  if (!password) { return res.status(400).json({ message: 'O campo "password" é obrigatório' }); }

  const validateEmail = midllewares.validateEmail(email);
  const validatePassword = midllewares.validatePassword(password);

  if (!validateEmail) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!validatePassword) { 
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = validateLogin;