const { StatusCodes } = require('http-status-codes');

const fs = require('fs').promises;

// const getTalkers = fs.require('../talker.json', 'utf8');

// cria endpoint de post /talker

try {
  module.exports = async (req, res) => {
    const { name, age, talk } = req.body;
    const talker = await fs.readFile('./talker.json', 'utf8');
    const talkerList = JSON.parse(await talker);
    const newTalker = { id: talkerList.length + 1, name, age, talk };
    talkerList.push(newTalker);
    await fs.writeFile('./talker.json', JSON.stringify(talkerList));
  
    return res.status(StatusCodes.CREATED).json(newTalker);
  };
} catch (err) {
  console.error(err);
}