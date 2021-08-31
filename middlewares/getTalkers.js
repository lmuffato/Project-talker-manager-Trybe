const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const getTalkers = async (_req, res) => {
  try {
    const data = await readFile('./talker.json');
    const result = JSON.parse(data);  
    return res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = getTalkers;