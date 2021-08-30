const fs = require('fs/promises');
const path = require("path");
const { StatusCodes } = require('http-status-codes');

module.exports = async function (req, res, next) {
    try {
        const { id } = req.params

        const absolutePath = path.resolve('./talker.json');       
        data = await fs.readFile(absolutePath)
        
        const talkers = JSON.parse(data);
        for (obj of talkers) {
            if (obj.id == id) {
                return res.status(StatusCodes.OK).json(obj);
            }
        }

        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    } catch (err) {
        next(err);
    }
};