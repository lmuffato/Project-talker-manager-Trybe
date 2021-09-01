const fs = require('fs').promises;

function readingFile() {
  console.log('cheguei no readingFile');
  const theFile = 'talker.json';
  return fs.readFile(theFile, 'utf8')
  .then((data) => JSON.parse(data));
}

const getAllTalkers = async (_req, res) => {
  const allTalkersList = await readingFile();
  return res.status(200).json(allTalkersList);
};

module.exports = { getAllTalkers };
