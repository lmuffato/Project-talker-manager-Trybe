const fs = require('fs');
const path = require('path');
const { StatusCodes } = require('http-status-codes');

module.exports = async function (req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        
        const absolutePath = path.resolve('./talker.json');       
        const data = await fs.promises.readFile(absolutePath);
        
        const talkers = JSON.parse(data);
        const found = talkers.find((talker) => talker.id === id);
        if (!found) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Pessoa palestrante não encontrada',
            });
        }

        return res.status(StatusCodes.OK).json(found);
    } catch (err) {
        next(err);
    }
};