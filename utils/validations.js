const { readFile } = require('./handleFile');
const { 
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
  HTTP_NOT_FOUND,
} = require('./serverStatus');

function isEmailValid(req, res, next) {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  if (!email) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  
  if (!isValid) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
}

function isPasswordValid(req, res, next) {
  const { password } = req.body;

  if (!password) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
}

function isIdValid(req, res, next) {
  try {
    const { id } = req.params;
    const data = readFile();
    const talker = data.find((dataTalker) => parseInt(id, 10) === dataTalker.id);

    if (!talker) {
      return res.status(HTTP_NOT_FOUND).json({ 
        message: 'Pessoa palestrante não encontrada',
      });
    }

    req.data = data;
    req.talker = talker;

    next();
  } catch (err) {
    next(err);
  }
}

function isTokenValid(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED).json({
      message: 'Token não encontrado',
    });
  }

  if (authorization !== '7mqaVRXJSp886CGr') {
    return res.status(HTTP_UNAUTHORIZED).json({
      message: 'Token inválido',
    });
  }

  next();
}

function isNameValid(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
}

function isAgeValid(req, res, next) {
  const { age } = req.body;

  if (!age) {
    return res.status(HTTP_BAD_REQUEST).json({
       message: 'O campo "age" é obrigatório',
    });
  }

  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
}

function isTalkValid(req, res, next) {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
}

function isTalkDateValid(req, res, next) {
  const { talk } = req.body;
  const { watchedAt } = talk || { watchedAt: undefined };
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const isValid = dateRegex.test(watchedAt);

  if (!isValid && watchedAt !== undefined) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  
  next();
}

function isTalkRateValid(req, res, next) {
  const { talk } = req.body;
  const { rate } = talk || { rate: undefined };
  const rateRegex = /^[1-5]$/i;
  const isValid = rateRegex.test(rate);

  if (!isValid && rate !== undefined) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
}

module.exports = {
  isEmailValid,
  isPasswordValid,
  isIdValid,
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isTalkDateValid,
  isTalkRateValid,
};
