const { BAD_REQUEST } = require('./httpStatus');

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const isValidDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const testRegex = isValidDate.test(talk.watchedAt);
  if (talk.rate < 1 || talk.rate > 5) {
    res.status(BAD_REQUEST).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!testRegex) {
    return res.status(BAD_REQUEST).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
    );
  }
  if (!talk) {
    return res.status(BAD_REQUEST).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  next();
};

module.exports = validateTalk;
