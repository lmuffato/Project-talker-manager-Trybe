const HTTP_ERROR_STATUS = 404;

const verifyEmail = (request, response, next) => {
  const { email } = request.body;
  const emailRegex = /^\w+@\w+.com$/;
  const testEmail = emailRegex.test(email); 

  if (!email || email === '') {
    return response.status(HTTP_ERROR_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!testEmail) {
    return response.status(HTTP_ERROR_STATUS)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  return next();
};

const verifyPassword = (request, response, next) => {
  const { password } = request.body;

  if (!password || password === '') {
    return response.status(HTTP_ERROR_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(HTTP_ERROR_STATUS)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return next();
};

const verifyToken = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }

  return next();
};

const verifyName = (request, response, next) => {
  const { name } = request.body;

  if (!name || name === '') {
    return response.status(HTTP_ERROR_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(HTTP_ERROR_STATUS)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  return next();
};

const verifyAge = (request, response, next) => {
  const { age } = request.body;

  if (!age || age === '') {
    return response.status(HTTP_ERROR_STATUS).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return response.status(HTTP_ERROR_STATUS)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  return next();
};

const verifyTalk = (request, response, next) => {
  const { talk } = request.body;

  if ((!talk || !talk.watchedAt) || (!talk.rate && talk.rate !== 0)) {
    return response.status(HTTP_ERROR_STATUS)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  return next();
};

const verifyWatchedAt = (request, response, next) => {
  const { talk: { watchedAt } } = request.body;
  const regexWatchedAt = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const testWatchedAt = regexWatchedAt.test(watchedAt);

  if (!testWatchedAt) {
    return response.status(HTTP_ERROR_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  return next();
};

const verifyRate = (request, response, next) => {
  const { talk: { rate } } = request.body;

  if (rate < 1 || rate > 5) {
    return response.status(HTTP_ERROR_STATUS)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  return next();
};

module.exports = { verifyEmail,
  verifyPassword,
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyWatchedAt,
  verifyRate,
};
