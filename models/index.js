// Dentro dessa pasta irão ficar os arquivos que irão se comunicar com o 'talker.json'

const fs = require('fs').promises;

const data = async () => {
  const readData = await fs.readFile('./talker.json', 'utf8').then((file) => JSON.parse(file));
  return readData;
};

module.exports = { data };
