const fs = require('fs').promises;

// função que lê o json, retorna null se o array for de tamanho 0.
const readFileCustom = async () => {
  let file = await fs.readFile('talker.json');
  file = JSON.parse(file);
  if (file.length === 0) return null;
  return file;
  // console.log(file.length);
};

module.exports = {
  readFileCustom,
};