const fs = require('fs').promises;
const { HTTP_OK_STATUS } = require('../utils/statusHttp');

const talkerEdit = async (req, res) => {
  const { id } = req.params;

  const data = JSON.parse(await fs.readFile('talker.json'));

  const findIndex = data.findIndex((talker) => talker.id === id);
  const newTalker = {
    id: Number(id),
    ...req.body,
  };

  data.splice(findIndex, 1, newTalker);
  await fs.writeFileSync('./talker.json', JSON.stringify(data));

  res.status(HTTP_OK_STATUS).json(newTalker);
};

module.exports = {
  talkerEdit,
};