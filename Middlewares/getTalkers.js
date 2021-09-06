const fs = require('fs').promises;

module.exports = async (_req, res, _next) => {
    const data = await fs.readFile('./talker.json', 'utf8');
    res.status(200).json(JSON.parse(data));
};
