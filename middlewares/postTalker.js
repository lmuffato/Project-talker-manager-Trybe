const { getTalkers } = require('../functions/getTalkers');
const { writeTalker } = require('../functions/writeTalker');

// Middleware para inclusão de um novo talker
const registerTalker = async (request, response) => {
    const talkerRequest = request.body; // Carrega os dados da requisição
    const talkersDatabase = await getTalkers(); // Carrega a base de dados atual

    const newId = { id: talkersDatabase.length + 1 }; // O novo id será o comprimento do array + 1
    const newTalker = Object.assign(newId, talkerRequest); // mescla os objetos 
    talkersDatabase.push(newTalker); // Acrescenta o novo talker no array
    const newDatabase = JSON.stringify(talkersDatabase); // Converte em json

    await writeTalker(newDatabase); // Grava os dados no arquivo
    return response.status(201).json(newTalker).end(); // Envia a confirmação
};
    
module.exports = { registerTalker };
