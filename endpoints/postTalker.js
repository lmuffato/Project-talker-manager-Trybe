const fs = require('fs').promises;

const validarToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization === '') {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validarNome = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validarIdade = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validarTalk = (request, response, next) => {
  const { talk } = request.body;
  
  if (!talk || (!talk.rate && talk.rate !== 0)) {
    return response.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const validarNota = (request, response, next) => {
  const { talk } = request.body;
  const { rate } = talk;

  if (rate < 1 || rate > 5) {
    return response.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!rate) {
    return response.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const talkWatchedAtValidation = (request, response, next) => {
  const { talk } = request.body;
  const { watchedAt } = talk;
  const watchedAtTest = /\d\d\/\d\d\/\d\d\d\d/g.test(watchedAt);
  if (!watchedAt) {
    return response.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  if (!watchedAtTest) {
    return response.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const addPalestrante = async (req, res, _next) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const ler = await fs.readFile('./talker.json', 'utf-8');
  const lido = await JSON.parse(ler);

  // Armazenar dados do novo palestrante
  const novoPalestrante = {
    id: lido.length + 1,
    name,
    age,
    talk: { watchedAt, rate },
  };

  // Gravar dados do novo palestrante
  lido.push(novoPalestrante);
  await fs.writeFile('./talker.json', JSON.stringify(lido));
  return res.status(201).json(novoPalestrante);
};

module.exports = {
  addPalestrante,
  validarToken,
  validarNome,
  validarIdade,
  validarTalk,
  validarNota,
  talkWatchedAtValidation,
};