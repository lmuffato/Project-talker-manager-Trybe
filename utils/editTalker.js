const { getAllTalkers, editData } = require('../readData');

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await getAllTalkers();

  const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
  if (talkers[talkerIndex] !== -1) {
    talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk: { watchedAt, rate } };
    const filterOutdatedInfo = talkers.filter((talker) => talker.id !== parseInt(id, 10));
    filterOutdatedInfo.push(talkers[talkerIndex]);
    await editData(filterOutdatedInfo);
    res.status(200).json(talkers[talkerIndex]);
  }
};

module.exports = editTalker;