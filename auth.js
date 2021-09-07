const verifyEmail = (request, response, next) => {
  const { email } = request.body;
  const emailRegex = /^\w+@\w+.com$/;
  const testEmail = emailRegex.test(email); 

  if (!email || email === '') {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!testEmail) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const verifyPassword = (request, response, next) => {
  const { password } = request.body;

  if (!password || password === '') {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = { verifyEmail, verifyPassword };
