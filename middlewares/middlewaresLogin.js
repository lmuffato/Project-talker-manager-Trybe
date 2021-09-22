const validateLogin = (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email).test(email);
  
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatŕoio' });
  }
  if (!regex) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password é obrigatório' });
  }

  if (password && password.length >= 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = { 
  validateEmail,
  validateLogin,
  validatePassword,
};
