const fs = require('fs').promises;
const crypto = require('crypto');

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

  // Função cedida pelo Paulo 
  function generateId(arr) {
    const maxID = arr.reduce(
    (accumulator, currentValue) => (
      accumulator.id > currentValue.id ? accumulator.id : currentValue.id
      ),
    );
    return maxID + 1;
    }

    function generateToken() {
      return crypto.randomBytes(8).toString('hex');
      }

module.exports = {
  readFile,
  writeFile,
  generateId,
  generateToken,
};