const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_BAD_REQUEST_STATUS = 400;
// const HTTP_OK_STATUS = 200;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }
  next();
}

function validateName(req, res, next) {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
//   if (Number.isInteger(age)) return res.status(HTTP_OK_STATUS);
  next();
}

function validateTalkDate(req, res, next) {
  const { watchedAt } = req.body.talk;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!(watchedAt.match(regex))) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}

function validateRate(req, res, next) {
  const { rate } = req.body.talk;

  if (rate < 1 || rate > 5) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
}

module.exports = { 
  verifyToken,
  validateName,
  validateAge,
  validateTalkDate,
  validateRate,
  validateTalk,
};
