const validateEmail = (email) => {
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  return (emailPattern.test(email));
};

const validateEmailMiddleware = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') { // tratando email vazio ou inexistente
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) { // tratando e-mail inválido
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePasswordMiddleware = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  validateEmailMiddleware,
  validatePasswordMiddleware,
};