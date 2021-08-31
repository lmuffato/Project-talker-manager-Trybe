const validateEmail = (request, response, next) => {
  const { email } = request.body;

  const re = /\S+@\S+\.\S+/;

  if (!email || email === '') {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!re.test(String(email).toLowerCase())) {
    return response
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = validateEmail;
