const fs = require('fs');

const deleteTalker = (req, res, _next) => {
    const { id } = req.params;

    const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
    const filtered = talkers.filtered((talker) => talker.id !== parseInt(id, 10));

    fs.writeFileSync('./talker.json', JSON.stringify(filtered));

    return res.status(200).JSON({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
