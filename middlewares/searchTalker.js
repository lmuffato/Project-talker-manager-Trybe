const { getTalkers } = require('../functions/getTalkers');

// Middleware para editar as informações de um talker
const searchTalker = async (request, response) => {
  const talkersDatabase = await getTalkers();
  const { q } = await request.query; // Parâmetro da query
  const talkersFiltred = await talkersDatabase.filter((talker) => String(talker.name).includes(q));
  if (!q) { return response.status(200).json(talkersDatabase).end(); }
  return response.status(200).json(talkersFiltred).end(); // Envia a confirmação
};

module.exports = { searchTalker };
