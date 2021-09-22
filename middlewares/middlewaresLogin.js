const validateLogin = (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const regex = /[\w\D]{6}/.test(password);

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (!regex) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = { 
  validateEmail,
  validateLogin,
  validatePassword,
};
