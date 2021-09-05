const fs = require('fs').promises;

// const {
//   checkAuth, checkName, checkAge, checkTalkWatchDate, checkTalkRate, checkTalk,
//  } = require('./checkTalker');

// async function checkRate(req, res) {
//   const { talk } = req.body;
//   if (talk.rate < 1 || talk.rate > 5) {
//     return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
//   }
// }

const editTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  // await checkAuth(req, res);
  // await checkName(req, res);
  // await checkAge(req, res);
  // await checkTalk(req, res);
  // await checkRate(req, res);
  // await checkTalkWatchDate(req, res);
  // await checkTalkRate(req, res);
  try {
    const talkersList = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
    const editedTalker = { id: Number(id), name, age, talk };
    talkersList[Number(id)] = editedTalker;
    await fs.writeFile('./talker.json', JSON.stringify(talkersList));
    res.status(200).json(editedTalker);
  } catch (e) {
    console.error(e.message);
  }
};

const editCheckAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const editCheckName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
   return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const editCheckAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || typeof age !== 'number') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const editCheckTalk = (req, res, next) => {
  const { talk } = req.body;
  if (talk === undefined || talk.watchedAt === undefined || talk.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const editCheckTalkWatchDate = (req, res, next) => {
  const { talk } = req.body;
  const datePattern = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!talk.watchedAt) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!talk.watchedAt.match(datePattern)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const editCheckTalkRate = (req, res) => {
  const { talk } = req.body;
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  editTalker(req, res);
};

module.exports = {
  editCheckAuth,
  editCheckName,
  editCheckAge,
  editCheckTalk,
  editCheckTalkWatchDate,
  editCheckTalkRate,
};
