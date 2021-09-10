const fs = require('fs').promises;

module.exports = async (_req, res) => {
    const talker = await fs.readFile('./talker.json', 'utf8');
    const response = await JSON.parse(talker);
    res.status(200).json(response);
};