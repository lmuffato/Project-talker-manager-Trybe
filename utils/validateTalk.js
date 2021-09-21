const { TALK } = require('./errorConstants');
const { BAD_REQUEST } = require('./status');

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(BAD_REQUEST).json({ message: TALK });
  next();
};

module.exports = validateTalk;