const verifyEmailExists = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } 
    next();
};

const verifyEmailPattern = (req, res, next) => {
  const { email } = req.body;
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  
  if (emailPattern.test(email) === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
    next();
};

const verifyPasswordExists = (req, res, next) => {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
    next();
};

const verifyPasswordLenght = (req, res, next) => {
  const { password } = req.body;
  
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } 
    next();
};

const generateToken = () => {
  const length = 16;
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];  
  for (let i = 0; i < length; i += 1) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join('');
};

const findToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  next();
};

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const findName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const findAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const findTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk) {
    return res.status(400).json({ message: 
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  
  if (!watchedAt || !rate) {
    return res.status(400).json({ message: 
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const checkRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate > 5) {
    return res.status(400).json({ message: 
      'O campo "rate" deve ser um inteiro de 1 à 5' });
  } if (rate < 1) {
    return res.status(400).json({ message: 
      'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const checkWhachedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const datePattern = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

  if (datePattern.test(watchedAt) === false) {
    return res.status(400).json({ message: 
      'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } 
  next();
};

module.exports = {
  verifyEmailExists, 
  verifyEmailPattern, 
  verifyPasswordExists, 
  verifyPasswordLenght, 
  generateToken,
  findToken,
  checkToken,
  findName,
  checkName,
  findAge,
  checkAge,
  findTalk,
  checkTalk,
  checkRate, 
  checkWhachedAt,
};