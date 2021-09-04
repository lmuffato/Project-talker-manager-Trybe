const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const regexAuthorization = /^[0-9a-zA-Z]{16}$/;
  if (!authorization) res.status(401).send({ message: 'Token não encontrado' });
  if (!regexAuthorization.test(authorization)) res.status(401).send({ message: 'Token inválido' });
  next();
};

const validateNameAndAge = (req, res, next) => {
  const {
    body: { name, age },
  } = req;
  if (!name) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalker = (req, res, next) => {
  const {
    body: { talk },
  } = req;
  if (!talk) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (talk.rate === undefined || talk.watchedAt === undefined) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const validateTalkerInfos = (req, res, next) => {
  const regesDate = /^\d\d\/\d\d\/\d\d\d\d$/; // Contribuição do Fasanaro
  const {
    body: { talk: { rate, watchedAt } },
  } = req;
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!regesDate.test(watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = {
  validateToken,
  validateNameAndAge,
  validateTalker,
  validateTalkerInfos,
};