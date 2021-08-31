const fs = require('fs').promises;

const getTalkerById = async (req, res) => {
  const { id } = req.params; 

  const NOT_FOUND_MSG = 'Pessoa palestrante não encontrada';

  console.log('ID: ', id);

  try {
    const a = await fs.readFile('./talker.json', 'utf-8');
    const parsed = JSON.parse(a);

    const filtered = parsed.find((f) => f.id === Number(id));
    
    if (filtered === undefined) return res.status(404).json({ message: NOT_FOUND_MSG });

    res.status(200).json(filtered);
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = getTalkerById;