const isValidEmail = (req, res, next) => { 
  const { email } = req.body;

  if (!email) { 
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const isValidToken = (req, res, next) => {
  const token = req.headers.authorization;
  const tokenRegex = /^[a-zA-Z0-9]{16}$/;

  if (!token || token === '') {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (!(token.match(tokenRegex))) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const isValidName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const isValidAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if ((parseInt(age, 10)) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const isValidTalk = (req, res, next) => {
  const msg = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json(
      { message: msg },
    );
  }

  const { watchedAt, rate } = talk;

  if (!watchedAt || (!rate && rate !== 0)) {
    return res.status(400).json(
      { message: msg },
    );
  }

  next();
};

const isValidDate = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;

  const dateRegex = /^\d{2}([///])\d{2}\1\d{4}$/;

  if (!(watchedAt.match(dateRegex))) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const isValidRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  const parseRate = parseInt(rate, 10);

  if (!(Number.isInteger(parseRate)) || parseRate < 1 || parseRate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidDate,
  isValidRate,
};
