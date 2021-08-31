const fs = require('fs');
const path = require('path');
const { StatusCodes } = require('http-status-codes');

module.exports = async function (req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
    
        const absolutePath = path.resolve('./talker.json');
        const data = await fs.promises.readFile(absolutePath);

        const talkers = JSON.parse(data);
        const found = talkers.findIndex((talker) => talker.id === id);
        
        if (found === -1) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Palestrante não encontrado.',
            });
        }

        const updated = { ...req.body, id };
        talkers[found] = updated;
        
        await fs.promises.writeFile(
            absolutePath,
            JSON.stringify(talkers),
        );

        return res.status(StatusCodes.OK).json(updated);
    } catch (err) {
        next(err);
    }
};