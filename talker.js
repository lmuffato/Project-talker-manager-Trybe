const fs = require('fs/promises');

const talker = async (req, res) => {
  const readFile = await fs.readFile('talker.json');
  
  return res.status(200).json(JSON.parse((readFile)));
};

module.exports = talker;