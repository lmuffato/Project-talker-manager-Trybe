const writeData = require('../utils/wiriteData');

const writeTalker = async (req, res) => {
    const { name, age, talk } = req.body;
    const talker = { name, age, talk };
    const response = await writeData(talker);
    if (!response) return res.status(400).send('sorry');
    return res.status(201).json(response);
};

module.exports = writeTalker;