const { readJsonReturnArray } = require('../utils/read');
const { writeAnObjectIntoAJSONFile } = require('../utils/write');
const { returnArrayDifferentID } = require('../utils/talkerFilters');

async function editTalkers(request, response) {
    const { id } = request.params;
    const { name, age, talk } = request.body;
    const talkerDBPath = './talker.json';
    const talkerDB = await readJsonReturnArray(talkerDBPath);
    const newTalkersList = returnArrayDifferentID(talkerDB);
    const talkerToAdd = { name, age, talk, id: Number(id) };
    newTalkersList.push(talkerToAdd);
    await writeAnObjectIntoAJSONFile(talkerDB);
    return response.status(200).json(talkerToAdd);
}

module.exports = editTalkers;
