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

const validatePassword = (request, response, next) => {
  const { password } = request.body;
  if (!password) {
    return response.status(HTTP_BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  
  if (password.length < 6) {
    return response.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = { validateEmail, validatePassword };