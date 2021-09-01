// Aqui está contida a comunicação com o arquivo 'talker.json'

const fs = require('fs').promises;

const databaseTalker = async () => {
  const readData = await fs.readFile('./talker.json', 'utf8').then((file) => JSON.parse(file));
  return readData;
};

const addEditTalker = async (insertUser) => {
  await fs.writeFile('./talker.json', JSON.stringify(insertUser));
};

module.exports = { databaseTalker, addEditTalker };
