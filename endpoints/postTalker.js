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

// validartalk, validarNota e validarData precisam
// vir nessa ordem senão não passam nos testes 
const validarTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const validarNota = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate < 1 || rate > 5) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!rate) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const validarData = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  // Recebi ajuda da aluna Nathi Zebral para entender esse regex
  // Grazie mille per tutto ragazza dai capelli rossi!
  const pattern = /\d\d\/\d\d\/\d\d\d\d/g.test(watchedAt);
  if (!watchedAt) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  if (!pattern) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const addPalestrante = async (req, res, _next) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const ler = await fs.readFile('./talker.json', 'utf-8');
  const lido = await JSON.parse(ler);

  // Armazenar dados do novo palestrante
  // id: lido.length + 1 => incrementa o ID
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
  validarData,
};