const { readJsonReturnArray } = require('../utils/read');
const { writeAnObjectIntoAJSONFile } = require('../utils/write');
const { returnArrayDifferentID } = require('../utils/talkerFilters');

async function deleteTalker(request, response) {
  const { id } = request.params;
  const talkerDBPath = './talker.json';
  const talkerDB = await readJsonReturnArray(talkerDBPath);
  const newTalkersList = returnArrayDifferentID(talkerDB, id);
  const message = { message: 'Pessoa palestrante deletada com sucesso' };
  await writeAnObjectIntoAJSONFile(newTalkersList);
  return response.status(200).send(message);
}

module.exports = deleteTalker;
