const { getTalkers } = require('../functions/getTalkers');
const { writeTalker } = require('../functions/writeTalker');

// Middleware para inclusão de um novo talker
const updateTalker = async (request, response) => {
    const dataToUpdate = request.body; // Carrega os dados da requisição
    delete dataToUpdate.id; // A paga a propriedade id, caso ela venha na requisição
    const { id } = request.params; // id da URL
    const talkersDatabase = await getTalkers(); // Carrega a base de dados atual

    const index = talkersDatabase.findIndex((talker) => talker.id === parseInt(id, 10)); // Descobre o indice do talker baseado no valor da chave id
    const propertiesToUpdate = Object.keys(dataToUpdate); // array com as chaves que serão alteradas

    propertiesToUpdate.forEach((key) => { // altera as propriedades
      talkersDatabase[index][key] = dataToUpdate[key];
    });

    const newDatabase = JSON.stringify(talkersDatabase); // Converte em json
    await writeTalker(newDatabase); // Grava os dados no arquivo
    return response.status(200).json(talkersDatabase[index]).end(); // Envia a confirmação
};

module.exports = { updateTalker };
