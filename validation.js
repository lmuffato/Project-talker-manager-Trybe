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
  const { token } = req.headers;
  
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    res.status(400).json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    res.status(400).json({ message: 'O campo name é obrigatório' });
  }

  if (name.length < 3) {
    res.status(400).json({ message: 'O name deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') {
    res.status(400).json({ message: 'O campo age é obrigatório' });
  }

  if (age < 18) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateData = (req, res, next) => {
  const { talk } = req.body;
  const { date } = talk;

  if (date) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
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
  const { rate, date } = talk;

  if (!talk && (rate === 0 || date === '')) {
    res.status(400).json({ message: 'O campo age é obrigatório' });
  }
  next();
};

module.exports = { 
  validateEmail, 
  validatePassword, 
  validateToken, 
  validateName, 
  validateAge, 
  validateData, 
  validateRate, 
  validateTalk,
};
