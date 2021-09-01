const tokenValidator = require('../utils/tokenValidator');

function validateToken(request, response, next) {
  const { authorization } = req.headers;
  const validate = tokenValidator(authorization);
  if(validate === 0) {
    return next();
  }
  return res.status(401).json(validate);
}

module.exports = validateToken;
