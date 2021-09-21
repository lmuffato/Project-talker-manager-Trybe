const { TALK } = require('./errorConstants');

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: TALK });
  next();
};

module.exports = validateTalk;