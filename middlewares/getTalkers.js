const fs = require('fs').promises;

const getTalkers = async (_req, res) => {
 const talkers = await fs.readFile('./talker.json', 'utf-8');
 const formatedTalkers = await JSON.parse(talkers);
 res.status(200).json(formatedTalkers);
};

module.exports = getTalkers;
