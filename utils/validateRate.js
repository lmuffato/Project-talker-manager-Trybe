const { BAD_REQUEST } = require('./httpStatus');

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rate < 1 || rate > 5) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!rate || rate === undefined) {
    return res.status(BAD_REQUEST).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  next();
};

module.exports = validateRate;