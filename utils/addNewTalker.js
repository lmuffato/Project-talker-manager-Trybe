// const editTalkersList = require('../readDataFromFiles');
const { getAllTalkers, editData } = require('../readData');
// const { HTTP_CREATE_STATUS } = require('./httpStatus');

const addNewTalker = async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const talkers = await getAllTalkers();

  if (talkers[talkers.length - 1]) {
    const { id: prevId } = talkers[talkers.length - 1];
    const id = parseInt(prevId, 10) + 1;
    talkers.push({
      id,
      name,
      age,
      talk: { watchedAt, rate },
    });
    await editData(talkers);
  }
  const newList = await getAllTalkers();
  res.status(201).json(newList[newList.length - 1]);
};

module.exports = addNewTalker;
