const fs = require('fs');

const talkerId = (req, res) => {
    const { id } = req.params;
    const talker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'))
    .find((i) => Number(i.id) === Number(id));

if (talker) return res.status(200).json(talker);

return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = talkerId;
