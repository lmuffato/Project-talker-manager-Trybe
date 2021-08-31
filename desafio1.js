const fs = require('fs').promises;

function getAllTalkers(_req, res) {
  fs.readFile('./talker.json', 'utf-8')
    .then((result) => {
      res.status(200).json(JSON.parse(result));
    })
    .catch((e) => console.error(e.message));
}

module.exports = getAllTalkers;