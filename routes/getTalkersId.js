const fs = require('fs').promises;

const getData = () => fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));
  
  const getTalkersId = async (req, res) => {
  const { id } = req.params;
  const data = await getData();
  const talker = data.find((t) => t.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  return res.status(200).json(talker);
};

module.exports = getTalkersId;
