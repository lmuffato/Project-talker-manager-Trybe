const fs = require('fs').promises;

module.exports = async (request, response) => {
    const { id } = request.params;
    const talkers = await fs.readFile('./talker.json');
    const result = await JSON.parse(talkers);
    const talkerId = result.find((talker) => talker.id === +id);
    if (!talkerId) response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    response.status(200).json(talkerId);
};