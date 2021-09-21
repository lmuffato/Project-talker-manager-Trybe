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

const getSortedTalker = async (req, res) => {
  const talkers = await convertFromJSON();
  const { id } = req.params;
  const filterdTalker = talkers.filter((talker) => talker.id === id);
  if (filterdTalker.length === 0) {
    res.status(STATUS.SUCCESS.NO_CONTENT).send('Nenhum resultado encontrado');
  }
  res.status(STATUS.SUCCESS.OK).send(filterdTalker);
};

module.exports = {
    getAllTalker,
    getSortedTalker,
};