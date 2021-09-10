const validaToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validaNome = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validaIdade = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validaTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talk === {} || !talk.watchedAt || !talk.rate) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validaWatchedAt = (req, res, next) => {
  const { talk } = req.body;

  const watchedAtRegex = new RegExp(
    /^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\d{4}$/,
    );

  if (!talk.watchedAt || talk.watchedAt === '' || !watchedAtRegex.test(talk.watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validaRate = (req, res, next) => {
  const { talk } = req.body;

  if (talk.rate < 1 || talk.rate > 5 || !talk.rate || talk.rate === '') {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  validaRate,
  validaWatchedAt,
  validaTalk,
  validaToken,
  validaIdade,
  validaNome,
};
