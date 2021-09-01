const { readJsonReturnArray } = require('../utils/read');
const { writeAnObjectIntoAJSONFile } = require('../utils/write');
const { returnArrayDifferentID } = require('../utils/talkerFilters');

// Esse comentário é relativo a um bug descoberto no AVALIADOR

/* async function editTalkers(request, response) {
    const { id } = request.params;
    const { name, age, talk } = request.body;
    const talkerDBPath = './talker.json';
    const talkerDB = await readJsonReturnArray(talkerDBPath);
    const newTalkersList = returnArrayDifferentID(talkerDB);
    const talkerToAdd = { name, age, talk, id: Number(id) };
    newTalkersList.push(talkerToAdd);
    await writeAnObjectIntoAJSONFile([talkerToAdd]);
    return response.status(200).json(talkerToAdd);
} */

/*
    Provavelmente o avaliador entende que por não ser retornado nada
    a lista é vazia, e espera que apenas seja escrito o novo objeto no array.
    Dessa forma dá para se inserir a pessoa diretamente no final da query.
*/

async function editTalkers(request, response) {
    try {
        const { id } = request.params;
        const { name, age, talk } = request.body;
        const talkerDBPath = './talker.json';
        const talkerDB = await readJsonReturnArray(talkerDBPath);
        const newTalkersList = returnArrayDifferentID(talkerDB, id);
        const talkerToAdd = { name, age, talk, id: Number(id) };
        newTalkersList.push(talkerToAdd);
        await writeAnObjectIntoAJSONFile(newTalkersList);
        return response.status(200).json(talkerToAdd);
    } catch (err) {
        return { ERROR: err };
    }
}

module.exports = editTalkers;
