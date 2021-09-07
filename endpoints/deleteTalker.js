const fs = require('fs').promises;

const deletarPalestrante = async (req, res) => {
  const { id: palestranteID } = req.params;
  
  const ler = await fs.readFile('./talker.json', 'utf-8');
  const lido = await JSON.parse(ler);
  
  const buscaPorID = lido.filter(({ id }) => +id !== +palestranteID);
  
  await fs.writeFile('./talker.json', JSON.stringify(buscaPorID));
  
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deletarPalestrante;