const fs = require('fs');
const { HTTP_CREATE_STATUS } = require('../utils/statusHttp');

const newTalker = async (req, res) => {
  const { name, age, talk } = req.body;

  const arrayTalker = JSON.parse(fs.readFileSync('talker.json'));

  const addNewTalker = {
    id: arrayTalker.length + 1, name, age, talk,
  };

  arrayTalker.push(addNewTalker);
  fs.writeFileSync('talker.json', JSON.stringify(arrayTalker));

  res.status(HTTP_CREATE_STATUS).send(addNewTalker);
};

module.exports = {
  newTalker,
};