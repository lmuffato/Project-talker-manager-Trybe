const HTTP_BAD_REQUEST_STATUS = 400;

const validateEmail = (request, response, next) => {
  const { email } = request.body;
  if (!email || email === '') {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  // Source: https://regexr.com/64or4
  const emailRegex = /^\S+@\S+.[a-z]$/.test(email);
  if (!emailRegex) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
  }
  next();
};

const validatePassword = (request, response, next) => {
  const { password } = request.body;
  const MAX_PASS_LENGTH = 6;
  if (!password || password === '') {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < MAX_PASS_LENGTH) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  validateEmail,
  validatePassword,
};
