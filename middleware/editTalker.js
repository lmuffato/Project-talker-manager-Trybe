const fs = require('fs').promises;

module.exports = async (req, res) => {
    const { name, age, talk } = req.body;
    const { id } = req.params;
    const talker = await fs.readFile('./talker.json', 'utf8');
    const talkerEdit = { id: +id, name, age, talk };
    const talkers = JSON.parse(talker);
    const talkerFilter = talkers.filter((t) => t.id === +id);
    talkerFilter.push(talkerEdit);
    
    await fs.writeFile('./talker.json', JSON.stringify(talkerFilter), 'utf-8');
    return res.status(200).json(talkerEdit);
};