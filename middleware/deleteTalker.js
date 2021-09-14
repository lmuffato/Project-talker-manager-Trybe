const fs = require('fs').promises;

module.exports = async (req, res) => {
    const { id } = req.params;
    const talker = await fs.readFile('./talker.json', 'utf8');
    const talkers = JSON.parse(talker);
    const talkerFilter = talkers.filter((t) => t.id === id);
    await fs.writeFile('./talker.json', JSON.stringify(talkerFilter), 'utf8');
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
