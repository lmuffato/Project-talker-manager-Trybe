const FAIL_STATUS = 400;

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(FAIL_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(FAIL_STATUS).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(FAIL_STATUS).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res
      .status(FAIL_STATUS).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalkDate = (req, res, next) => {
  const { talk } = req.body;
  const regexDate = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;
  if (!regexDate.test(talk.watchedAt)) {
    return res
      .status(FAIL_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateTalkRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (!rate && rate !== 0) {
    return res
     .status(FAIL_STATUS)
     .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(FAIL_STATUS).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res
     .status(FAIL_STATUS)
     .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!talk.watchedAt && talk.watchedAt !== 0) {
    return res
     .status(FAIL_STATUS)
     .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

module.exports = {
  validateName,
  validateAge,
  validateTalkDate,
  validateTalkRate,
  validateTalk,
};