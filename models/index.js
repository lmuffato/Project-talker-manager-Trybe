// Dentro dessa pasta irão ficar os arquivos que irão se comunicar com o 'talker.json'

const fs = require('fs').promises;

const data = async () => {
  const readData = await fs.readFile('./talker.json', 'utf8').then((file) => JSON.parse(file));
  return readData;
};

const addTalker = async (insertUser) => {
  await fs.writeFile('./talker.json', JSON.stringify(insertUser));
};

module.exports = { data, addTalker };
