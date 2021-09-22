const fs = require('fs').promises;
const { HTTP_CREATE_STATUS } = require('../utils/statusHttp');

const newTalker = async (req, res) => {
  const data = 'talker.json';
  const { name, age, talk } = req.body;

  const arrayTalker = JSON.parse(await fs.readFile(data));

  const addNewTalker = {
    id: arrayTalker.length + 1, name, age, talk,
  };

  arrayTalker.push(addNewTalker);
  await fs.writeFile(data, JSON.stringify(arrayTalker));

  res.status(HTTP_CREATE_STATUS).send(addNewTalker);
};

module.exports = {
  newTalker,
};