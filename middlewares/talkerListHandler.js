function validateTalkerName(req, res, next) {
  const { name } = req.body;
  if (name === undefined || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validateTalkerAge(req, res, next) {
  const { age } = req.body;
  if (age === undefined || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (+age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

const checkTalkFields = (watchedAt, rate) => (
  watchedAt === undefined || watchedAt === '' || rate === undefined || rate === ''
);

const checkTalkExist = (talk) => (talk === undefined || talk === '');

const dateIsValid = (watchedAt) => {
  const dateFields = watchedAt.split('/');
  if (dateFields.length !== 3) return false;
  if (dateFields[0].length !== 2) return false;
  if (dateFields[1].length !== 2) return false;
  if (dateFields[2].length !== 4) return false;
  return true;
};

const rateIsValid = (rate) => {
  const rateNumber = +rate;
  if (!Number.isInteger(rateNumber)) return false;
  if (rateNumber < 1 || rateNumber > 5) return false;
  return true;
};

function validateTalk(req, res, next) {
  const { talk } = req.body;
  const msBlankField = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  if (checkTalkExist(talk)) {
    return res.status(400).json({ message: msBlankField });
  }
  const { watchedAt, rate } = talk;
  if (checkTalkFields(watchedAt, rate)) {
    return res.status(400).json({ message: msBlankField });
  }
  if (!dateIsValid(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!rateIsValid(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

const fsP = require('fs').promises;

const fs = require('fs');

const getMaxId = (talkersList) => (
  talkersList.reduce((maxId, talker) => {
    if (talker.id > maxId) return talker.id;
    return maxId;
  }, 0)
);

const saveTalkerList = (talkerList) => {
  fsP.writeFile('./talker.json', JSON.stringify(talkerList))
    .then(() => console.log('Lista de pessoas palestrantes salva com sucesso'))
    .catch((err) => console.log(err.message));
};

const readTalkerList = () => JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

function createTalker(req, res) {
  const talker = req.body;
  const talkers = readTalkerList();
  const newTalker = { id: 1 + getMaxId(talkers), ...talker };
  talkers.push(newTalker);
  saveTalkerList(talkers);
  return res.status(201).json(newTalker);
}

function editTalker(req, res) {
  const { id } = req.params;
  const talker = req.body;
  const talkers = readTalkerList().filter((talkerReg) => talkerReg.id !== +id);
  const editedTalker = { id: +id, ...talker };
  talkers.push(editedTalker);
  saveTalkerList(talkers);
  return res.status(200).json(editedTalker);
}

function deleteTalker(req, res) {
  const { id } = req.params;
  const talkers = readTalkerList().filter((talkerReg) => talkerReg.id !== +id);
  saveTalkerList(talkers);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}

module.exports = {
  newTalkerValidation: [validateTalkerName, validateTalkerAge, validateTalk],
  createTalker,
  editTalker,
  deleteTalker,
};
