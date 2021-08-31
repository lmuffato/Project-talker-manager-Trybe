const fs = require('fs');

const findTalkerById = (req, res) => {
  const { id } = req.params;
 
  const object = JSON.parse(fs.readFileSync('./talker.json', 'UTF-8'));
  const talker = object.find((tk) => tk.id === +id);

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talker);  
};

module.exports = findTalkerById;