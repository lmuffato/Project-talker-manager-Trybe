const tokenValidator = require('../utils/tokenValidator');

function validateToken(request, response, next) {
  const { authorization } = request.headers;
  const validate = tokenValidator(authorization);
  if (validate === 0) {
    return next();
  }
  return response.status(401).json(validate);
}

module.exports = validateToken;
