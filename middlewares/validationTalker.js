const { badRequest } = require('../httpStatusCode');

const NAME_MINIMUM_LENGTH = 3;
const AGE_MINIMUM = 18;

const validationTalker = (req, res, next) => {
  const { name, age } = req.body;

  if (!name) {
    return res.status(badRequest).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < NAME_MINIMUM_LENGTH) {
    return res.status(badRequest).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age) {
    return res.status(badRequest).json({ message: 'O campo "age" é obrigatório' });
  }

  if (Number(age) < AGE_MINIMUM) {
    return res.status(badRequest).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

module.exports = validationTalker;
