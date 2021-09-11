const { getTalkers } = require('../functions/getTalkers');
const { writeTalker } = require('../functions/writeTalker');

// const dataValidation = async (talkerRequest, talkersDatabase) => {
//   if (!talkerRequest) { throw new Error('Sua request está indefinida'); }
//   if (!talkersDatabase) { throw new Error('Base de dados indefinida'); }
// };

// Middleware para validação do nome
const registerTalker = async (request, response, next) => {
  try {
    // const talkerRequest = await request.body;
    const talkersDatabase = await getTalkers(); // Carrega a base de dados atual
    if (!talkersDatabase) { throw new Error('Token não encontrado'); }
    // const newId = { id: talkersDatabase.length + 1 }; // O novo id será o comprimento do array + 1
    // const newTalker = Object.assign(newId, talkerRequest);
    // await talkersDatabase.push(newTalker);
    // const newDatabase = JSON.stringify(talkersDatabase);
    // await writeTalker(newDatabase);
    // return request.status(201).json(talkerRequest);
  } catch (error) { return request.status(400).json({ message: error.message }); }
    // next();
    // return response.status(201).json(newTalker).end();
};

module.exports = { registerTalker };
