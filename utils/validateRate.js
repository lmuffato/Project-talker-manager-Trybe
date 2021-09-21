const { TALK, RATE } = require('./errorConstants');

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (!rate) return res.status(400).json({ message: TALK });
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: RATE });
  }
  next();
};

module.exports = validateRate;