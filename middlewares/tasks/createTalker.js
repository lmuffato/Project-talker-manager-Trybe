const myModule = require('../../modules');

const HTTP_OK_STATUS = 201;
const FILE_NAME = 'talker.json';

module.exports = async (req, res, _next) => {
  const { name, age, talk } = req.body;
  const data = await myModule.readFileAsync(FILE_NAME);
  const newTalk = {
    id: data.length + 1,
    name,
    age,
    talk,
  };
  data.push(newTalk);
  await myModule.writeFileAsync(FILE_NAME, JSON.stringify(data));
  res.status(HTTP_OK_STATUS).json(newTalk); 
};
