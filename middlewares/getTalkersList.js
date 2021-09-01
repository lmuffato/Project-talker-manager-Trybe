const fs = require('fs').promises;

const getTalkersList = async (req, res, next) => {
  try {
    const content = await fs.readFile('./talker.json');
    const talkers = JSON.parse(content);
    res.status(200).json(talkers);
  } catch (e) {
    console.log('Tratamento no middleware específico');
    next(e.message);
  }
};

module.exports = getTalkersList;
