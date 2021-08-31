const fileSystem = require('fs').promises;

const getTalkers = async (pathFile) => {
  try {
    const talkers = await fileSystem.readFile(pathFile, 'utf-8');
    return JSON.parse(talkers);
  } catch (error) {
    console.error(error);
    throw new Error('Não foi possível ler ou acessar o arquivo de dados.');
  }
};

const getTalker = async (id, pathFile) => {
  try {
    const talkersFile = await fileSystem.readFile(pathFile, 'utf-8');
    const talkers = await JSON.parse(talkersFile);

    const talker = talkers.find((talkerResult) => talkerResult.id === Number(id));

    if (!talker) return null;

    return talker;
  } catch (error) {
    console.error(error);
    throw new Error('Não foi possível ler ou acessar o arquivo de dados.');
  }
};

module.exports = { getTalkers, getTalker };
