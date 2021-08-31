const readData = require('../utils/readData');

const searchTalker = async (req, res) => {
    const talkerArr = await readData();
    const { q } = req.query;
    if (!q || q.length === 0) return res.status(200).json(talkerArr);
    const filtered = talkerArr.filter(({ name }) => name.includes(q));
    return res.status(200).json(filtered);
};

module.exports = searchTalker;