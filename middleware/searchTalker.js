const fs = require('fs').promises;

module.exports = async (req, res) => {
    const { q } = req.query;
    const talker = await fs.readFile('./talker.json', 'utf8');
    const response = await JSON.parse(talker);

    if (!q || q === '') return res.status(201).json(response);
    const talkersFilter = response.filter((t) => t.name.includes(q));
    if (!talkersFilter) return res.status(201).json([]);
    if (!talkersFilter) { 
    return res.status(400).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(talkersFilter);  
};
