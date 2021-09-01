function rateValidator() {
  if (rate < 1 || rate > 5) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return 0;
}

module.exports = rateValidator;
