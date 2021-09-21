const { AGE_REQUIRED, MINIMUN_AGE } = require('./errorConstants');

const validateAge = (request, response, next) => {
  const { age } = request.body;
  if (!age) return response.status(400).json({ message: AGE_REQUIRED });
  if (age < 18) return response.status(400).json({ message: MINIMUN_AGE });
  next();
};

module.exports = validateAge;