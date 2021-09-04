const verifyLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  } 
  console.log(authorization, 'frase');

  next();
};

const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!regex) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  const regex = /[\w\D]{6}/.test(password);
  if (!regex) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  next();
};

module.exports = { verifyLogin, verifyEmail, verifyPassword };