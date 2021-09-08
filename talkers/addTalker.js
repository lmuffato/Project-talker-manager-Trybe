const { StatusCodes } = require('http-status-codes');

const fs = require('fs').promises;

// cria endpoint de post /talker

module.exports = async (req, res) => {
    try {
    const { name, age, talk } = req.body;
    const talker = await fs.readFile('./talker.json', 'utf8');
    const talkerList = JSON.parse(talker);
    const newTalker = { id: talkerList.length + 1, name, age, talk };
    talkerList.push(newTalker);
    await fs.writeFile('./talker.json', JSON.stringify(talkerList), 'utf8');
  
    return res.status(StatusCodes.CREATED).json(newTalker);
    } catch (err) {
      console.error(err);
    }
  };
