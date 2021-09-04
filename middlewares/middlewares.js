const verifyLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  } 
  console.log(authorization, 'frase');

  next();
};

const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!regex) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  const regex = /[\w\D]{6}/.test(password);
  if (!regex) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  next();
};

const verifyName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } if (name.length <= 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const verifyAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const verifyDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
  .test(watchedAt);

  if (!watchedAt) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
  }
  if (!regex) {
    return res.status(400).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
      );
  }

  next();
};

const verifyTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
  }

  next();
};

const verifyRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate) {
    res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
  }
  next();
};

module.exports = {
  verifyLogin,
  verifyEmail,
  verifyPassword,
  verifyName,
  verifyAge,
  verifyDate,
  verifyTalk,
  verifyRate,
};