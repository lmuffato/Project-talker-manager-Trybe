const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } if (name.length <= 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  
  next();
};
  
const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  
  next();
};
  
const validateDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
    .test(watchedAt);
  
  if (!watchedAt) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
  }

  if (!regex) {
    return res.status(400).json(
    { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
    );
  }
  
  next();
};
  
const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  
  next();
};
  
const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate) {
    res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  if (rate < 1 || rate > 5) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  next();
};

module.exports = {
  validateName,
  validateRate,
  validateTalk,
  validateAge,
  validateDate,
};
