const validToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.lenght !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};
const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.lenght < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age.length === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (parseInt(age, 10) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validTalk = (req, res, next) => {
  const { talk: watchedAt } = req.body;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

  module.exports = { validToken, validName, validAge, validTalk };
