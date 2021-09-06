const fs = require('fs').promises;

const editarPalestrante = async (req, res, _next) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;

  const ler = await fs.readFile('./talker.json', 'utf-8');
  const lido = await JSON.parse(ler);
  console.log(lido);
  const updateDados = { id: +id, name, age, talk };
  console.log(updateDados);
  // Procurar palestrante pelo ID
  const buscaPorID = lido.filter((buscar) => buscar.id === id);
  buscaPorID.push(updateDados);
  await fs.writeFile('./talker.json', JSON.stringify(buscaPorID));
  
  return res.status(200).json(updateDados);
};

module.exports = editarPalestrante;