const { writeFile } = require('fs').promises;

async function writeInTalker(input) {
  // console.log('meu input: ', input);
  const intputJSON = JSON.stringify(input);
  try {
    await writeFile('./talker.json', intputJSON);
    // console.log('escreveu', intputJSON);
  } catch (err) {
    console.err(`Erro ao escrever no arquivo testa: ${err.message}`);
  }
}

module.exports = writeInTalker;
