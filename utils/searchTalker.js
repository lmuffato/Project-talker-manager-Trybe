const { getAllTalkers } = require('../readData');
const { HTTP_OK_STATUS } = require('./httpStatus');

const searchTalker = async (req, res) => {
  const { name } = req.query;
  const talkers = await getAllTalkers();

  if (!name || name === '') {
    return res.status(HTTP_OK_STATUS).json(talkers);
  }

  const filterTalkers = talkers.filter((talker) => talker.name.includes(name));

  if (filterTalkers) {
    return res.status(HTTP_OK_STATUS).json(filterTalkers);  
  }

  const emptySearchArr = [];
  return res.status(HTTP_OK_STATUS).json(emptySearchArr);
};

module.exports = searchTalker;
