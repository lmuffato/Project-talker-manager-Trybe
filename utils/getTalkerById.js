const parsedData = require('./parseData');

const getById = async (id) => {
  const talkers = await parsedData();

  const result = talkers.find((talker) => talker.id === +id);
  return result;
};

module.exports = getById;
