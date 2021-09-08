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

const verifyToken = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const verifyName = (request, response, next) => {
  const { name } = request.body;

  if (!name || name === '') {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const verifyAge = (request, response, next) => {
  const { age } = request.body;

  if (!age || age === '') {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

module.exports = { verifyEmail, verifyPassword, verifyToken, verifyName, verifyAge };
