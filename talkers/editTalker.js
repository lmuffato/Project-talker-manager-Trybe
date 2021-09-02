const { StatusCodes } = require('http-status-codes');
const { writeFiles, readFiles } = require('../utility');

module.exports = async (req, res) => {
  const { body: { name, age, talk }, params: { id } } = req;
  const talkersList = await readFiles();

  const editedTalker = { id: +id, name, age, talk };
  const filterTalkerByiD = talkersList.filter((talker) => talker.id === id);
  filterTalkerByiD.push(editedTalker);
  await writeFiles(filterTalkerByiD);
  
  return res.status(StatusCodes.OK).json(editedTalker);
};
