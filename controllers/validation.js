const { lerArquivo, escreverArquivo } = require('./talkerController');

const validationToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization !== '7mqaVRXJSp886CGr') {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validationName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length <= 2) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validationAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age <= 17) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const validateDate = (req, res, next) => {
  const { talk } = req.body;

  if (!talk.watchedAt || talk.watchedAt === '') {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  const dateRegex = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;
  // Felipe Müller
  if (!dateRegex.test(talk.watchedAt)) {
    return res.status(400).json({
      message:
        'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk.rate || talk.rate === '') {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({
      message:
        'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

const createTalk = async (req, res) => {
  const { name, age, talk } = req.body;

  const talkData = await lerArquivo();
  const talkrs = { id: talkData.length + 1, name, age, talk };

  const newTalk = [...talkData, talkrs];
  await escreverArquivo(newTalk);

  res.status(201).json(talkrs);
};

module.exports = {
  validationToken,
  validationName,
  validationAge,
  validateTalk,
  validateDate,
  validateRate,
  createTalk,
};
