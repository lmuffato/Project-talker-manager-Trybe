function validadeRate(req, res, next) {
  try {
    const { talk: { rate } } = req.body;
    if (rate < 1 || rate > 5) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = validadeRate;
