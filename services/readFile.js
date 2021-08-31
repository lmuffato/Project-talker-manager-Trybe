const fs = require('fs').promises;

const talker = './talker.json';

const readFile = () => (
  fs.readFile(talker, 'utf8')
    .then((data) => JSON.parse(data))
    .catch((e) => {
      console.error(`Não foi possível ler o arquivo ${talker}\n Erro: ${e.message}`);
    })
);

module.exports = {
  readFile,
};