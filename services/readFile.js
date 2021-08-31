const fs = require('fs').promises;

const talker = './talker.json';

const readFile = () => (
  fs.readFile(talker, 'utf8')
    .then((data) => JSON.parse(data))
    .catch((e) => {
      console.error(`Não foi possível ler o arquivo ${talker}\n Erro: ${e.message}`);
    })
);

// Função cedida pelo Luan Ramalho
async function writeFile(newFile) {
  const setFile = await fs.writeFile('./talker.json', JSON.stringify(newFile));
  return setFile;
  } 

module.exports = {
  readFile,
  writeFile,
};