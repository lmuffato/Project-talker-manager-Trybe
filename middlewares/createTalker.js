// const fs = require('fs');

// async function writeNewTalker(req, _res) {
//   const { name, age, talk } = req.body;
//   const talkersList = await fs.readFile('../talker.json');
//   const newTalker = {
//     id: talkersList.length + 1,
//     name,
//     age,
//     talk,
//   };
//   talkersList.push(newTalker);
//   fs.writeFileSync('../talker.json', JSON.stringify(talkersList));
// }

function checkAuth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
}

function checkName(req, res, next) {
  const { name } = req.body;
  if (!name || name === '') {
   return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function checkAge(req, res, next) {
  const { age } = req.body;
  if (!age || typeof age !== 'number') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function checkTalkWatchDate(req, res, next) {
  const { talk } = req.body;
  const datePattern = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!talk.watchedAt.match(datePattern)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}

function checkTalkRate(req, res) {
  const { talk } = req.body;
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  // writeNewTalker(req, res);
  return res.status(201).json({ ok: true });
}

module.exports = {
  checkAuth,
  checkName,
  checkAge,
  checkTalkWatchDate,
  checkTalkRate,
};
