const fs = require('fs').promises;
const { FILE_NAME, HTTP_OK_STATUS } = require('../../util/constants');

const getAllTalkers = async (_req, res) => {
  try {
    const data = await fs.readFile(`./${FILE_NAME}`, 'utf8');
    const parsedData = await JSON.parse(data);
    res.status(HTTP_OK_STATUS).json(parsedData);
  } catch (e) {
    res.status(HTTP_OK_STATUS).json({ error: e.message });
  }
};

module.exports = getAllTalkers;
