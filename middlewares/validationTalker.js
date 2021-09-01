const validaToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
};

const validaNome = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') { 
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validaIdade = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') { 
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (+age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validaTalkDeclarado = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk) {
    return res.status(400)
      .json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
  }

  next();
};

const validaWatchedAt = (req, res, next) => {
  const watchedAtRegex = /\d{2}[/]\d{2}[/]\d{4}/;
  const { talk } = req.body;
  const { watchedAt } = talk;

  if (!watchedAt || watchedAt === '') {
    return res.status(400)
      .json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
  }

  if (!watchedAtRegex.test(watchedAt)) { 
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validaRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate === undefined) {
    return res.status(400)
      .json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
  }

  if (+rate < 1 || +rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const validationTalker = [
  validaToken,
  validaNome,
  validaIdade,
  validaTalkDeclarado,
  validaWatchedAt,
  validaRate,
];

module.exports = validationTalker;
