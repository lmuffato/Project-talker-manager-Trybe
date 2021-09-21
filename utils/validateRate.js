const { TALK, RATE } = require('./errorConstants');
const { BAD_REQUEST } = require('./status');

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (!rate || rate === undefined) return res.status(BAD_REQUEST).json({ message: TALK });
  if (rate < 1 || rate > 5) {
    return res.status(BAD_REQUEST).json({ message: RATE });
  }
  next();
};

module.exports = validateRate;