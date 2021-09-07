function validateRate(req, res, next) {
  try {
    const { talk: { rate } } = req.body;
    if (rate < 1 || rate > 5) {
      return res.status(400).json(
        { message: 'O campo "rate" deve ser inteiro de 1 à 5' },
      );
    }
    next();
  } catch (err) {
    return console.error(err.message);
  }
}

module.exports = validateRate;
