const fs = require('fs').promises;
const { FILE_NAME, HTTP_OK_STATUS, HTTP_NOTFOUND_STATUS } = require('../../util/constants');

const getOneTalkerById = async (req, res) => {
  try {
    const talkerID = Number(req.params.id);
    const data = await fs.readFile(`./${FILE_NAME}`, 'utf8');
    const parsedData = await JSON.parse(data);
    const talker = parsedData.find((person) => person.id === talkerID);
    if (!talker) throw new Error('Pessoa palestrante não encontrada');
    res.status(HTTP_OK_STATUS).json(talker);
  } catch (e) {
    res
      .status(HTTP_NOTFOUND_STATUS)
      .json({ message: e.message });
  }
};

module.exports = getOneTalkerById;
