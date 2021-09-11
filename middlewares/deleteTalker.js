const { getTalkers } = require('../functions/getTalkers');
const { writeTalker } = require('../functions/writeTalker');

// Middleware para deletar um novo talker
const deleteTalker = async (request, response) => {
  try {
    const idToRemove = await request.params.id; // id da URL
    
    let talkersDatabase = await getTalkers(); // Carrega a base de dados atual
    talkersDatabase = talkersDatabase.filter((talker) => talker.id !== parseInt(idToRemove, 10));

    const newDatabase = JSON.stringify(talkersDatabase); // Converte em json
    await writeTalker(newDatabase); // Grava os dados no arquivo
    return response.status(200)
      .json({ message: 'Pessoa palestrante deletada com sucesso' }).end(); // Envia a confirmação
  } catch (error) { return response.status(404).json({ message: error.message }); }
};

module.exports = { deleteTalker };
