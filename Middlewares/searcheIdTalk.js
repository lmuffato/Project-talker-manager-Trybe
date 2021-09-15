const fs = require('fs').promises;

module.exports = async (req, resp) => {
    const file = await fs.readFile('./talker.json');
    const result = JSON.parse(file.toString('utf-8'));
    const res = result.find(({ id }) => id === Number(req.params.id));
    if (res) {
      return resp.status(200).json(res);
    }
    resp
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
    }; 
