const fs = require('fs');
const path = require('path');
const { StatusCodes } = require('http-status-codes');

module.exports = async function (req, res, next) {
    try {
        const absolutePath = path.resolve('./talker.json');
        const data = await fs.promises.readFile(absolutePath);

        const talkers = JSON.parse(data);

        const newTalker = {
            id: talkers.length + 1,
            ...req.body,
        };

        const updated = [...talkers, newTalker];
        await fs.promises.writeFile(
            absolutePath,
            JSON.stringify(updated),
        );

        return res.status(StatusCodes.CREATED).json(newTalker);
    } catch (err) {
        next(err);
    }
};