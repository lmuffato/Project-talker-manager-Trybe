const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { talk } = req.body;
  const ratePattern = /^[1-5]{1}$/;
  const watchedAtPattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!ratePattern.test(talk.rate)) {
    const rate = 'O campo "rate" deve ser um inteiro de 1 à 5';
    return res.status(StatusCodes.BAD_REQUEST).json({ message: rate });
    }
  if (!watchedAtPattern.test(talk.watchedAt)) {
    const date = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
    return res.status(StatusCodes.BAD_REQUEST).json({ message: date });
  }
  next();
};
