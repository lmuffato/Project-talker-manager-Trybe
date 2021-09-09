const validateEmail = (req, res, next) => {
  const { email } = req.body;

  function EmailIsValid(emailvalid) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailvalid);
  }
  
  const valid = EmailIsValid(email); // retorna true or false

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  
  if (!valid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status().json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(400).json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateDate = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;

  function DateIsValid(date) {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
  }
  
  const valid = DateIsValid(watchedAt); // retorna true or false

  if (!valid) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  // uso o talk.rate e talk.watchedAt pois estou validadno o talk e se ele não existir nao c
  
  if (!talk || talk.rate === 0 || talk.watchedAt === '') {
    return res.status(400)
      .json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );   
  }
  next();
};

module.exports = { 
  validateEmail, 
  validatePassword, 
  validateToken, 
  validateName, 
  validateAge, 
  validateDate, 
  validateRate, 
  validateTalk,
};
