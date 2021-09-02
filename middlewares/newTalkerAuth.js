/* regex da validação da data retirado de
https://stackoverflow.com/questions/15196451/
regular-expression-to-validate-datetime-format-mm-dd-yyyy */

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  const intAge = parseInt(age, 10);
  if (!age) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (intAge < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const sentece = talk && talk.watchedAt && talk.rate;
  if (!sentece) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const intRate = parseInt(rate, 10);
  const sentece = intRate >= 1 || intRate <= 5;
  if (!sentece) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

const validateDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const validateNewTalker = [
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateDate,
];

module.exports = validateNewTalker;
