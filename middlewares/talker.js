const fs = require('fs').promises;
const STATUS = require('../status/http_status');
const genToken = require('../auth/authCore');

const convertFromJSON = async () => {
  const rawTalkers = (await fs.readFile('./talker.json')).toString('utf-8');
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

module.exports = {
    getAllTalker,
    getSortedTalker,
    generateToken,
    pushNewTalker,
};