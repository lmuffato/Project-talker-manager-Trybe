const { readFile } = require('../promisesFs.js');

const HTTP_OK_STATUS = 200;

const talker = async (req, res) => {
  const talkersList = await readFile();
    return res.status(HTTP_OK_STATUS).json(talkersList);
};

module.exports = talker;

// http :3000/talker
