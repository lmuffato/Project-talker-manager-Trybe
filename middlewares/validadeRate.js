function validadeRate(req, res, next) {
  try {
    const { talk } = req.body;
    const rate = parseInt(talk.rate, 10);
    if (typeof talk.rate !== 'number' || rate > 5 || rate < 1) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = validadeRate;
