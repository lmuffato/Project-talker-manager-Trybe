const fs = require('fs').promises;

module.exports = async (req, res) => {
    const { id } = req.params;
    const talker = await fs.readFile('./talker.json', 'utf8');
    const response = await JSON.parse(talker);
    const talkerRes = response.find((index) => index.id === parseInt(id, 0));
    if (!talkerRes) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talkerRes);
};