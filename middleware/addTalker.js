const fs = require('fs').promises;

module.exports = async (req, res) => {
    const { name, age, talk } = req.body;
    const talker = await fs.readFile('./talker.json', 'utf8');
    const response = await JSON.parse(talker);
    const newTalker = { name, age, talk, id: response.length + 1 };
    response.push(newTalker);
    await fs.writeFile('talker.json', JSON.stringify(response));
    res.status(201).json(response);
};