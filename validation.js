const STATUS_BAD_REQ = 400;
const STATUS_BAD_TOKEN = 401;

const validToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(STATUS_BAD_TOKEN).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length < 16 || authorization.length > 16) {
    return res.status(STATUS_BAD_TOKEN).json({ message: 'Token inválido' });
  }
  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(STATUS_BAD_REQ).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(STATUS_BAD_REQ)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age.length === '') {
    return res.status(STATUS_BAD_REQ).json({ message: 'O campo "age" é obrigatório' });
  }
  if (parseInt(age, 10) < 18) {
    return res.status(STATUS_BAD_REQ)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(STATUS_BAD_REQ).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const validTalkKeys = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!dateRegex.test(watchedAt)) {
    return res.status(STATUS_BAD_REQ)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(STATUS_BAD_REQ)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const allTalkerValidations = [
  validToken,
  validName,
  validAge,
  validTalk,
  validTalkKeys,
];

  module.exports = { allTalkerValidations, validToken };

/* Referência de regex de IagoFerreira:
https://github.com/tryber/sd-010-a-project-talker-manager/pull/4/files ;
*/
