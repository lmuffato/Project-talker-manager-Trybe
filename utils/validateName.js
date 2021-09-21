const { NAME_REQUIRED, NAME_LENGTH } = require('./errorConstants');
const { BAD_REQUEST } = require('./status');

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(BAD_REQUEST).json({ message: NAME_REQUIRED });
  if (name.length < 3) return res.status(BAD_REQUEST).json({ message: NAME_LENGTH });
  next();
};

module.exports = validateName;