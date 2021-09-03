const fs = require('fs').promises;

const readData = async () => {
  const content = await fs.readFile('./talker.json', 'utf-8');

  const data = JSON.parse(content);
  return data;
};

const writeData = async (data) => {
  await fs.writeFile('./talker.json', JSON.stringify(data));
};

module.exports = {
  readData,
  writeData,
};