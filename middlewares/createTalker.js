const editTalkers = require('../fs-utils/editTalkers');
const getTalkers = require('../fs-utils/getTalkers');

const HTTP_OK_STATUS = 201;

const createTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkersList = await getTalkers();
  const countTalker = talkersList.length;
  const newTalker = {
    id: countTalker + 1,
    name,
    age,
    talk,
  };
  talkersList.push(newTalker);
  await editTalkers(talkersList).catch((err) => console.error(err));
  return res.status(HTTP_OK_STATUS).json(newTalker);
};

module.exports = createTalker;
