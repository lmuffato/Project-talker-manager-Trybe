const { getTalkers } = require('../functions/getTalkers');
const { writeTalker } = require('../functions/writeTalker');

// Middleware para editar as informações de um talker
const updateTalker = async (request, response) => {
  try {
    const dataToUpdate = request.body; // Carrega os dados da requisição
    delete dataToUpdate.id; // A paga a propriedade id, caso ela venha na requisição, para garantir que ela não seja alterada
    const idToUpdate = request.params.id; // id da URL.
    const talkersDatabase = await getTalkers(); // Carrega a base de dados atual
  
    const index = talkersDatabase.findIndex((talker) => talker.id === parseInt(idToUpdate, 10)); // Descobre o indice do talker baseado no valor da chave id
    const propertiesToUpdate = Object.keys(dataToUpdate); // Cria um array com as chaves que serão alteradas
  
    propertiesToUpdate.forEach((key) => { // Altera as propriedades contidas no array do talker especificado pelo índice
      talkersDatabase[index][key] = dataToUpdate[key];
    });
  
    const newDatabase = JSON.stringify(talkersDatabase); // Converte em json
    await writeTalker(newDatabase); // Grava os dados no arquivo
    return response.status(200).json(talkersDatabase[index]).end(); // Envia a confirmação
  } catch (error) { return response.status(400).json({ message: error.message }); }
};

module.exports = { updateTalker };
