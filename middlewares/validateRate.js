const INVALID_RATE = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (!Number.isInteger(Number(rate)) || !(rate >= 1 && rate <= 5)) {
    return res.status(400).json(INVALID_RATE);
  }

  next();
};

module.exports = { validateRate };