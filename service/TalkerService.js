const fileSystem = require('fs').promises;

const Talker = require('../model/Talker');
const { SRC_TALKER_DATA } = require('../config/Files');

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

const registerTalker = async (talker) => {
  const talkers = await getTalkers(SRC_TALKER_DATA);

  const { name, age, talk } = talker;
  const talkerValidated = new Talker(talkers.length + 1, name, age, talk);

  talkers.push(talkerValidated);

  try {
    await fileSystem.writeFile(SRC_TALKER_DATA, JSON.stringify(talkers));
  } catch (error) {
    console.error(error);
    throw new Error('Não foi possível ler ou acessar o arquivo de dados.');
  }

  return talkerValidated;
};

module.exports = { getTalkers, getTalker, registerTalker };
