const { StatusCodes } = require('http-status-codes');
const { readFiles } = require('../utility');

module.exports = async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const talkersList = await readFiles();

if (!q) return res.status(StatusCodes.OK).json(talkersList);
  
const filterTalkerBySearch = talkersList.filter(({ name }) => name.includes(q));
return (
  filterTalkerBySearch 
  ? res.status(StatusCodes.OK).json(filterTalkerBySearch) 
  : res.status(StatusCodes.OK).json([])
);
};
