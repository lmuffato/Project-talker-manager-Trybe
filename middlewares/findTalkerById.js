const fs = require('fs');

const findTalkerById = (req, res) => {
  const { id } = req.params;
  try {
    const object = JSON.parse(fs.readFileSync('./talker.json', 'UTF-8'));
    const talker = object.find((tk) => tk.id === +id);
    return res.status(200).json(talker);
  } catch (e) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
};

module.exports = findTalkerById;