const fs = require('fs').promises;

const getTalkers = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf8', (err, content) => {
    if (err) return [];
    return content;
  });
  return JSON.parse(talkers);
};

module.exports = getTalkers;