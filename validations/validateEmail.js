const HTTP_BAD_REQUEST = 400;

const validateEmail = (request, response, next) => {
  const { email } = request.body;
  if (!email) {
    return response.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  const re = /\S+@\S+\.\S+/;
  if (!(re.test(email))) {
    return response.status(HTTP_BAD_REQUEST)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

module.exports = validateEmail;