const editTalkers = require('../utils/editTalkers');
const getTalkers = require('../utils/getTalkers');
const { HTTP_OK_STATUS } = require('../utils/statusHttp');

const editTalker = async (req, res) => {
  const talkersList = await getTalkers();
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkerChanged = { 
    name,
    age,
    id: Number(id),
    talk };

  talkersList.filter((talker) => Number(talker.id) !== Number(id));
  talkersList.push(talkerChanged);
  
  await editTalkers(talkersList);
  
  return res.status(HTTP_OK_STATUS).json(talkerChanged);
};

module.exports = editTalker;