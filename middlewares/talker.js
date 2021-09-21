const fs = require('fs').promises;

const STATUS = require('../status/http_status');

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

module.exports = {
    getAllTalker,
    getSortedTalker,
};