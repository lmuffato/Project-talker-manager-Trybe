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

const getSortedTalker = async (req, res) => {
  const talkers = await convertFromJSON();
  const { id } = req.params;
  const filterdTalker = talkers.filter((talker) => talker.id === Number(id)).pop();
  if (!filterdTalker) {
    res
    .status(STATUS.ERROR.NOT_FOUND).send({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(STATUS.SUCCESS.OK).send(filterdTalker);
};

const generateToken = async (_req, res) => {
  const token = await genToken.generateToken();
  res.status(STATUS.SUCCESS.OK).send({ token });
};

const pushNewTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await convertFromJSON();
  const newTalker = {
    name,
    age,
    id: talkers.length + 1,
    talk,
  };
  talkers.push(newTalker);
  const JSONtalkers = JSON.stringify(talkers);
  fs.writeFile('./talker.json', JSONtalkers);
  res.status(STATUS.SUCCESS.CREATED).send(newTalker);
};

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const editedTalker = { name, age, id: Number(id), talk };
  const talkers = await convertFromJSON();
  const selectedTalker = talkers.filter((talker) => talker.id === Number(id)).pop();
  const index = talkers.indexOf(selectedTalker);
  talkers.splice(index, 1, editedTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  res.status(STATUS.SUCCESS.OK).send(editedTalker);
};

const removeTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await convertFromJSON();
  const selectedTalker = talkers.filter((talker) => talker.id === Number(id)).pop();
  const index = talkers.indexOf(selectedTalker);
  talkers.splice(index, 1);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  res.status(STATUS.SUCCESS.OK).send({ message: 'Pessoa palestrante deletada com sucesso' });
};

const TalkerBySearchTerm = async (req, res) => {
  const { q } = req.query;
  console.log(req.query);
  const talkers = await convertFromJSON();
  const filteredQ = talkers.filter((talker) => talker.name.includes(q));
  res.status(STATUS.SUCCESS.OK).send(filteredQ);
};

module.exports = {
    getAllTalker,
    getSortedTalker,
    generateToken,
    pushNewTalker,
    editTalker,
    removeTalker,
    TalkerBySearchTerm,
};