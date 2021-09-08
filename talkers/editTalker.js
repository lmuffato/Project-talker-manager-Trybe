const fs = require('fs').promises;

const { StatusCodes } = require('http-status-codes');

module.exports = async (req, res, _next) => {
  try {
    const { name, age, talk } = req.body;
    const { id } = req.params;
    const talkers = await fs.readFile('./talker.json', 'utf8');
    const talkerNew = { id: +id, name, age, talk };
    const talkerList = JSON.parse(talkers);
    const filtered = talkerList.filter((talker) => talker.id !== +id);
    filtered.push(talkerNew);
    
    await fs.writeFile('./talker.json', JSON.stringify(filtered), 'utf-8');
    return res.status(StatusCodes.OK).json(talkerNew);
  } catch (err) {
  console.error(err);
}
};
