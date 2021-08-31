const fs = require('fs').promises;

function readingFile() {
  const theFile = 'talker.json';
  fs.readFile(theFile, 'utf8')
  .then((data) => {
    JSON.parse(data);
  });
}

const allTalkers = async (_req, res) => {
  const allTalkersList = await readingFile();
  res.status(200).json(allTalkersList);
};

module.exports = allTalkers;