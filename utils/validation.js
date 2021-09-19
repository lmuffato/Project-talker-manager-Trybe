function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    }); 
  }

  next();
}

function authenticateRequest(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    }); 
  }
  next();
}

function validateName(name) {
  if (!name) return { message: 'O campo "name" é obrigatório' };

  if (name.length < 3) {
    return {
      message: 'O "name" deve ter pelo menos 3 caracteres',
    }; 
  }

  return '';
}
function validateAge(age) {
  if (!age) return { message: 'O campo "age" é obrigatório' };

  if (typeof age !== 'number' || age < 18) {
    return {
      message: 'A pessoa palestrante deve ser maior de idade',
    }; 
  }

  return '';
}

function checkTalkRate(rate) {
  if (typeof rate === 'number' && rate >= 1 && rate <= 5) {
    return false;
  }
  return true;
}

function checkTalkFields(talk) {
  if (talk && (talk.watchedAt && (talk.rate || talk.rate === 0))) {
    return false;
  }
  return true;
}

function validateTalk(talk) {
  if (checkTalkFields(talk)) {
    return {
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }
  if (!talk.watchedAt.match(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)) {
    return {
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    };
  }
  if (checkTalkRate(talk.rate)) {
    return {
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    };
  }

  return '';
}

function validateTalker(req, res, next) {
  const { name, age, talk } = req.body;
  if (validateName(name)) return res.status(400).json(validateName(name));
  if (validateAge(age)) return res.status(400).json(validateAge(age));
  if (validateTalk(talk)) return res.status(400).json(validateTalk(talk));

  next();
}

module.exports = {
  validateLogin,
  validateTalker,
  authenticateRequest,
};
