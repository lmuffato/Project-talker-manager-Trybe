const { StatusCodes } = require('http-status-codes');
const { writeFiles, readFiles } = require('../utility');

module.exports = async (req, res) => {
  const { id: idToDelete } = req.params;
  const talkersList = await readFiles();
  
  const filterTalkerByiD = talkersList.filter(({ id }) => +id !== +idToDelete);
  
  await writeFiles(filterTalkerByiD);
  
  return res.status(StatusCodes.OK).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
