const fs = require('fs').promises;
const { FILE_NAME, HTTP_CREATED_STATUS } = require('../../util/constants');

const addTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  try {    
    const data = await fs.readFile(`./${FILE_NAME}`, 'utf8');
    const parsedData = await JSON.parse(data);
    const newTalker = { name, age, talk, id: parsedData.length + 1 };
    const dataToWrite = [...parsedData, newTalker];
    await fs.writeFile(`./${FILE_NAME}`, JSON.stringify(dataToWrite));
    res.status(HTTP_CREATED_STATUS).json(newTalker);
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = addTalker;
