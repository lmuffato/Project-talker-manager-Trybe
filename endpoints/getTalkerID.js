const fs = require('fs').promises;

const getTalkerID = async (req, res, _next) => {
  const { id } = req.params;
  const ler = await fs.readFile('./talker.json', 'utf-8');
  const lido = await JSON.parse(ler);
  // Uso do + (+id) explicado em aula para converter para Número Inteiro
  const buscarID = lido.find((busca) => busca.id === +id);

  if (!buscarID) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(buscarID);
};

module.exports = getTalkerID;