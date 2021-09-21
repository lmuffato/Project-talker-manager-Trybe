const fs = require('fs');

const talker = async (req, res) => {
  const readFile = await fs.promises.readFile('talker.json');
  
  return res.status(200).json(JSON.parse((readFile)));
};

module.exports = talker;