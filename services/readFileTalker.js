const { readFile } = require('fs').promises;

async function readFileTalkers() {
  const getTalkers = await readFile('./talker.json', 'utf-8')
    .catch(() => { throw Error('Erro na leitura na leitura do arquivo talker.json'); });
  const talkersJSON = await JSON.parse(getTalkers);
  return talkersJSON;
}

module.exports = readFileTalkers;
