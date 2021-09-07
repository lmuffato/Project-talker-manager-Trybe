const { StatusCodes } = require('http-status-codes');

function dateRate(req, res, next) {
  const { talk } = req.body;
  const ratePattern = /^[1-5]{1}$/;
  const watchedAtPattern = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!ratePattern.test(talk.rate)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  if (!watchedAtPattern.test(talk.watchedAt)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  } 
  next();
}

module.exports = dateRate;
