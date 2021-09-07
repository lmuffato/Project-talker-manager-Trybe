const { StatusCodes } = require('http-status-codes');

const fs = require('fs').promises;

// cria endpoint de post /talker
module.exports = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkerList = await fs.readFile('./talker.json', 'utf8');
  const newTalker = { id: talkerList.length + 1, name, age, talk };
  talkerList.push(newTalker);
  await fs.writeFile(talkerList);

  return res.status(StatusCodes.CREATED).send(newTalker);
};