const { INVALID_TOKEN, TOKEN_NOT_FOUND } = require('./errorConstants');
const { UNAUTHORIZED } = require('./status');

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: TOKEN_NOT_FOUND });
  }
  if (authorization.length !== 16) {
    return res.status(UNAUTHORIZED).json({ message: INVALID_TOKEN });
  }
  next();
};

module.exports = validateToken;
