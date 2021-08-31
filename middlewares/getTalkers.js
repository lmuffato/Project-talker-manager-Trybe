const fs = require('fs').promises;

const getTalkers = async (req, _res, next) => {
  await fs.readFile('./talker.json').then((result) => {
    req.talkers = JSON.parse(result);
  });

  next();
};

module.exports = { getTalkers };