const fs = require('fs').promises;
const { FILE_NAME, HTTP_OK_STATUS, HTTP_BAD_REQUEST_STATUS } = require('../../util/constants');

const getOneTalkerById = async (req, res) => {
  const { q: query } = req.query;
  try {
    const data = await fs.readFile(`./${FILE_NAME}`, 'utf8');
    const parsedData = await JSON.parse(data);
    const talker = parsedData.filter((person) => person.name.includes(query));
    res.status(HTTP_OK_STATUS).json(talker);
  } catch (e) {
    res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: e.message });
  }
};

module.exports = getOneTalkerById;
