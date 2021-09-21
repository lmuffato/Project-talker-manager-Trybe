const { DATE_FORMAT, TALK } = require('./errorConstants');
const { BAD_REQUEST } = require('./status');

const validateWatched = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const watchedAtTest = /\d\d\/\d\d\/\d\d\d\d/g.test(watchedAt);
  if (!watchedAt) return res.status(BAD_REQUEST).json({ message: TALK });
  if (!watchedAtTest) {
    return res.status(BAD_REQUEST).json({ message: DATE_FORMAT });
  }
  next();
};

module.exports = validateWatched;