const { readJsonReturnArray } = require('../utils/read');
const { writeAnObjectIntoAJSONFile } = require('../utils/write');
const { returnArrayDifferentID } = require('../utils/talkerFilters');

async function editTalkers(request, response) {
  try {
    const { id } = request.params;
    const { name, age, talk } = request.body;
    const talkerDBPath = './talker.json';
    const talkerDB = await readJsonReturnArray(talkerDBPath);
    const newTalkersList = returnArrayDifferentID(talkerDB);

    const talkerToAdd = {
      name,
      age,
      talk,
      id,
    };

    newTalkersList.push(talkerToAdd);

    await writeAnObjectIntoAJSONFile(talkerDB);
    return response.status(201).json(talkerToAdd);

  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = editTalkers;
