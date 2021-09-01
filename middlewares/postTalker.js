const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (parseInt(age, 10) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || talk === '' || !talk.watchedAt || talk.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const checkWatched = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regexDate = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;
  if (!regexDate.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const checkRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (parseInt(rate, 10) < 1 || parseInt(rate, 10) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const addTalker = async (req, res) => {
  try {
    const data = await readFile('./talker.json');
    const result = JSON.parse(data);  
    const { name, age, talk } = req.body;
    const newTalker = {
      id: result.length + 1,
      name,
      age,
      talk,
    };
    result.push(newTalker);
    await writeFile('talker.json', JSON.stringify(result));
    return res.status(201).json(newTalker);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  checkToken,
  checkName,
  checkAge,
  checkWatched,
  checkRate,
  checkTalk,
  addTalker,
};

// Referência para validar "watchedAt": https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy