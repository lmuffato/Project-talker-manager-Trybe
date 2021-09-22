const fs = require('fs').promises;
const STATUS = require('../status/http_status');
const genToken = require('../auth/authCore');

const convertFromJSON = async () => {
  const rawTalkers = (await fs.readFile('./talker.json'));
  const talkers = JSON.parse(rawTalkers);
  return talkers;
};

const getAllTalker = async (_req, res) => {
  const talker = await convertFromJSON();
  res.status(STATUS.SUCCESS.OK).send(talker);
};

const getSortedTalker = async (req, res, next) => {
  try {
  const talkers = await convertFromJSON();
  const { id } = req.params;
  const filterdTalker = talkers.filter((talker) => talker.id === Number(id));
  res.status(STATUS.SUCCESS.OK).send(filterdTalker);
  } catch (err) {
    next(err);
  }
};

const generateToken = async (_req, res) => {
  const token = await genToken.generateToken();
  res.status(STATUS.SUCCESS.OK).send({ token });
};

const pushNewTalker = async (req, res) => {
  const newTalker = req.body;
  const talkers = await convertFromJSON();
  talkers.push(newTalker);
  const JSONtalkers = JSON.stringify(talkers);
  fs.writeFile('./talker.json', JSONtalkers);
  res.status(STATUS.SUCCESS.CREATED).send(newTalker);
};

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const editedTalker = {
    id: Number(id),
    name,
    age,
    talk,
  };
  const talkers = await convertFromJSON();
  const selectedTalker = talkers.filter((talker) => talker.id === Number(id)).pop;
  const index = talkers.indexOf(selectedTalker);
  talkers.splice(index, 1, editedTalker);  
  res.status(STATUS.SUCCESS.OK).send(editedTalker);
};

module.exports = {
    getAllTalker,
    getSortedTalker,
    generateToken,
    pushNewTalker,
    editTalker,
};