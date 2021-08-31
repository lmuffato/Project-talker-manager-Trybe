function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || authorization === ' ') {
    return res.status(401).json({ message: 'token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'token inválido' });
  }
  next();
}

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name || name === ' ') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;
  if (!age || age === ' ') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  if (!talk || !watchedAt || !rate) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
}

function validateWatchedAt(req, res, next) {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
}

function validateRate(req, res, next) {
  const { talk: { rate } } = req.body;

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

const AuthMiddleware = [
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
];

module.exports = AuthMiddleware;
