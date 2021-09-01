const { readJsonReturnArray } = require('../utils/read');

async function getAllTalkers(_require, response) {
  const arquivo = './talker.json';
  try {
    const arrayOfTalkers = await readJsonReturnArray(arquivo);
    return response.status(200).send(arrayOfTalkers);
  } catch (err) {
    return response.send(`Não leu, erro: \n${err}`);
  }
}

module.exports = getAllTalkers;
