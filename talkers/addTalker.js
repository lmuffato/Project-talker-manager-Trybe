const { StatusCodes } = require('http-status-codes');

const fs = require('fs').promises;

const getTalkers = require('./getTalkers');

// cria endpoint de post /talker
module.exports = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkerList = getTalkers;
  const newTalker = { id: talkerList.length + 1, name, age, talk };
  talkerList.push(newTalker);
  await fs.writeFile(talkerList);

  return res.status(StatusCodes.CREATED).send(newTalker);
};