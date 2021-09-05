const talkerModel = require('../model/talkerModel');

function validatePostTalkerName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
}

function validatePostTalkerAge(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  
  if (age < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  
  next();
}

function validatePostTalkerTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (!Object.keys(talk).includes('watchedAt') || !Object.keys(talk).includes('rate')) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
}

function validatePostTalkerDate(req, res, next) {
  const { talk } = req.body;
  const [d, m, y] = talk.watchedAt.split('/');
  if (d.length !== 2 || m.length !== 2 || y.length !== 4) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
}

function validatePostTalkerRate(req, res, next) {
  const { talk } = req.body;
  const { rate } = talk;
  const validRates = [1, 2, 3, 4, 5];
  if (!validRates.includes(rate)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
}

async function addTalker(newTalkerData) {
  const allTalkers = await talkerModel.getAllTalkers();
  const allTalkersIds = allTalkers.map((talker) => talker.id);
  const newTalkerID = Math.max(...allTalkersIds) + 1;
  const newTalker = {
    id: newTalkerID,
    name: newTalkerData.name,
    age: newTalkerData.age,
    talk: {
      watchedAt: newTalkerData.talk.watchedAt,
      rate: newTalkerData.talk.rate,
    },
  };
  await talkerModel.updateTalkerList([...allTalkers, newTalker]);
  return newTalker;
}

async function editTalker(id, newData) {
  const allTalkers = await talkerModel.getAllTalkers();
  const talkerToBeEditedIndex = allTalkers.findIndex((talker) => talker.id === id);
  const editedTalker = { id, ...newData };
  allTalkers[talkerToBeEditedIndex] = editedTalker;
  await talkerModel.updateTalkerList(allTalkers);
  return editedTalker;
}

async function deleteTalker(id) {
  const allTalkers = await talkerModel.getAllTalkers();
  const updatedTalkers = allTalkers.filter((talker) => talker.id !== id);
  await talkerModel.updateTalkerList(updatedTalkers);
}

module.exports = {
  validatePostTalkerName,
  validatePostTalkerAge,
  validatePostTalkerTalk,
  validatePostTalkerDate,
  validatePostTalkerRate,
  addTalker,
  editTalker,
  deleteTalker,
 };