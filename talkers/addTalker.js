const { StatusCodes } = require('http-status-codes');
const { writeFiles, readFiles } = require('../utility');

module.exports = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkersList = await readFiles();
  const newTalker = { id: talkersList.length + 1, name, age, talk };
  talkersList.push(newTalker);
  await writeFiles(talkersList);
  
  return res.status(StatusCodes.CREATED).send(newTalker);
};
