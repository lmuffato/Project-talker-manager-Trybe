const fs = require('fs').promises;
const { FILE_NAME, HTTP_OK_STATUS } = require('../../util/constants');

const removeTalker = async (req, res) => {
  const { id } = req.params;
  try {    
    const data = await fs.readFile(`./${FILE_NAME}`, 'utf8');
    const parsedData = await JSON.parse(data);
    await fs.writeFile(`./${FILE_NAME}`,
    JSON.stringify(parsedData.filter((talker) => talker.id !== Number(id))));
    res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = removeTalker;
