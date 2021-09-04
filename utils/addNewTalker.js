const { getAllTalkers, editData } = require('../readData');
const { HTTP_CREATE_STATUS } = require('./httpStatus');

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
  res.status(HTTP_CREATE_STATUS).json(newList[newList.length - 1]);
};

module.exports = addNewTalker;

// Para a resolução do requisito 04, foi consultado o PR do colega Gabriel Pereira e do colega Alexandre Oliveira:
// https://github.com/tryber/sd-010-a-project-talker-manager/tree/gbl97-sd-010-a-project-talker-manager
// https://github.com/tryber/sd-010-a-project-talker-manager/pull/9
