const fs = require('fs').promises;

function editTalkers(newTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalker));
}

module.exports = { editTalkers };
