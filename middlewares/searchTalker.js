const { getTalkers } = require('../functions/getTalkers');

// Middleware para editar as informações de um talker
const searchTalker = async (request, response) => {
  try {
  const { q } = await request.query; // Parâmetro da query
  const talkers = await getTalkers();
  const filtredTalkers = talkers.filter((talker) => talker.name.toLowerCase()
    .includes(q.toLowerCase()));
  return response.status(200).json(filtredTalkers); // Envia a confirmação
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

module.exports = { searchTalker };
