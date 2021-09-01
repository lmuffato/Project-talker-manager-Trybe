const HTTP_NOTOK_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    res.status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === ' ') {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (typeof age !== 'number') {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const isCorrectDate = (date) => {
  const patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  const isValid = patternData.test(date);
  return isValid;
};

const validateTalkToEdit = (talk, next) => {
  if (!talk || talk === ' ') return;

  if (talk.watchedAt === ' '
    || talk.rate === 0) next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk
      || talk === ' '
      || !talk.watchedAt
      || !talk.rate) {
    validateTalkToEdit(talk, next);
    res.status(HTTP_NOTOK_STATUS)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validateTalkDate = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;

  if (!watchedAt || !isCorrectDate(watchedAt)) {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateTalkRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  const convertedRate = parseFloat(rate);

  if (!rate || convertedRate <= 0 || convertedRate > 5) {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkDate,
  validateTalkRate,
};
