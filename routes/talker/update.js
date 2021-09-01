const fs = require('fs').promises;
const { FILE_NAME, HTTP_OK_STATUS } = require('../../util/constants');

const editTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  try {    
    const data = await fs.readFile(`./${FILE_NAME}`, 'utf8');
    const parsedData = await JSON.parse(data);
    const editedTalker = { id: Number(id), name, age, talk };
    parsedData[Number(id)] = editedTalker;
    await fs.writeFile(`./${FILE_NAME}`, JSON.stringify(parsedData));
    res.status(HTTP_OK_STATUS).json(editedTalker);
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = editTalker;
