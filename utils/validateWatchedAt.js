const { DATE_FORMAT, TALK } = require('./errorConstants');

const validateWatched = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const watchedAtTest = /\d\d\/\d\d\/\d\d\d\d/g.test(watchedAt);
  if (!watchedAt) return res.status(400).json({ message: TALK });
  if (!watchedAtTest) {
    return res.status(400).json({ message: DATE_FORMAT });
  }
  next();
};

module.exports = validateWatched;