const { readJsonReturnArray } = require('../utils/read');

async function getTalkerByID({ params: { id: paramID } }, response) {
  try {
    const arquivo = './talker.json';
    const arrayOfTalkers = await readJsonReturnArray(arquivo);
    const talkerWithID = arrayOfTalkers.find(
      ({ id: talkerID }) => talkerID === parseInt(paramID, 10),
    );
    if (!talkerWithID) {
      const errorMessage = { message: 'Pessoa palestrante não encontrada' };
      return response.status(404).send(errorMessage);
    }

    return response.status(200).send(talkerWithID);
  } catch (err) {
    console.log(err);
    return response.send(err);
  }
}

module.exports = getTalkerByID;
