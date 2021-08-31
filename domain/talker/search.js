const fs = require('fs');
const path = require('path');
const { StatusCodes } = require('http-status-codes');

module.exports = async function (req, res, next) {
    try {
        const { q } = req.query;
        if (!q) {
            return next();
        }

        const absolutePath = path.resolve('./talker.json');       
        const data = await fs.promises.readFile(absolutePath);
        
        const talkers = JSON.parse(data);
        const filtered = talkers.filter((talker) => talker.name.includes(q));

        return res.status(StatusCodes.OK).json(filtered);
    } catch (err) {
        next(err);
    }
};