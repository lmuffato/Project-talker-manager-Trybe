const fs = require('fs');

const dataTalkers = async (_req, res, _next) => {
    const data = await fs.readFile('./talker.json', 'utf8');
    res.status(200).json(JSON.parse(data));
};

module.exports = dataTalkers;