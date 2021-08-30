const readData = require('../utils/readData');

const talkerId = async (req, res) => {
    const { id } = req.params;
    const talkerArr = await readData();
    const talker = talkerArr.find((element) => element.id === Number(id));
    if (talker) return res.status(200).json(talker);
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = talkerId;