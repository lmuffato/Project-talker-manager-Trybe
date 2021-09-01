const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};
const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};
const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};
const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || talk.rate === undefined || !talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório e "watchedAt"'
      + ' e "rate" não podem ser vazios' });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const re = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!re.test(watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};