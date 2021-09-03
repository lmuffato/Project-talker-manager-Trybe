const Chance = require('chance');

const chance = new Chance();

const validateEmail = (req, res, next) => {
  const BAD_REQUEST = 400;
  const { email } = req.body;

  if (!email || !email.length) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!email.match(/\S+@\S+\.\S+/)) {
    return res.status(BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  return next();
};

const validatePassword = (req, res, next) => {
  const BAD_REQUEST = 400;
  const MIN_PASSWORD = 5;
  const { password } = req.body;

  if (!password || !password.length) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length <= MIN_PASSWORD) {
    return res.status(BAD_REQUEST).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  return next();
};

const generateToken = (req, res, next) => {
  req.token = chance.string({ length: 16 });
 
   return next();
 };

module.exports = {
  validateEmail,
  validatePassword,
  generateToken,
};

// Utilizada a biblioteca Chance para gerar o token aleatório
// https://chancejs.com/basics/string.html