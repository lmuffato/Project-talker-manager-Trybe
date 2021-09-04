const fs = require('fs').promises;
const getAllTalkers = require('./getAllTalkers');
const TALKERS_LIST = require('../talker.json');
const { HTTP_CREATE_STATUS } = require('./httpStatus');

const addNewTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await getAllTalkers();
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };
  talkers.push(newTalker);
  await fs.writeFile(TALKERS_LIST, JSON.stringify(talkers)).catch((e) => console.error(e));
  return res.status(HTTP_CREATE_STATUS).json(newTalker);
};

module.exports = addNewTalker;
