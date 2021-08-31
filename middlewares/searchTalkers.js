const { readFile } = require('fs').promises;

const searchTalkers = async (req, res) => {
  const { q } = req.query;
  let talkers;
  try {
    talkers = JSON.parse(await readFile('talker.json', 'utf-8'));
  } catch (error) {
    console.error(error);
  }
  const filtredTalkers = talkers.filter((t) => t.name.includes(q));

  return res.status(200).json(filtredTalkers);
};

module.exports = searchTalkers;