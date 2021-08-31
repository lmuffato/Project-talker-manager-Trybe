const fs = require('fs').promises;

const getTalkers = async (req, res) => {
  const talkers = await fs.readFile('./talker.json');
  const TalkerJSON = JSON.parse(talkers);
  
  if (TalkerJSON.length === 0) {
    return res.status(200).json([]);
  }
    return res.status(200).json(TalkerJSON);
};

module.exports = getTalkers;