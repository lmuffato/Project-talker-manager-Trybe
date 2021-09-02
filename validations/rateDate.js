const { StatusCodes } = require('http-status-codes');

module.exports = (talker) => {
  const ratePattern = /^[1-5]{1}$/;
  const watchedAtPattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAtPattern.test(talker.watchedAt)) {
    const date = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
    return { status: `${StatusCodes.BAD_REQUEST}`, message: date };
  }
  if (!ratePattern.test(talker.rate)) {
    const rate = 'O campo "rate" deve ser um inteiro de 1 à 5';
    return { status: `${StatusCodes.BAD_REQUEST}`, message: rate };
  }
  return '';  
};
