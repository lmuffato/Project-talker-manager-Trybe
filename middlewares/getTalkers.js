const fs = require('fs');

const getTalkers = (_req, res) => {
    try {
        const fileContent = fs.readFileSync('./talker.json', 'utf8');
        const talker = JSON.parse(fileContent) || [];
        return res.status(200).json(talker);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = getTalkers;
