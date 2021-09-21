const fs = require('fs').promises;

const STATUS = require('../status/http_status');

const getAllTalker = async (_req, res) => {
    try {
    const talker = (await fs.readFile('./talker.json')).toString('utf-8');
    res.status(STATUS.SUCCESS.OK).send(talker);
    } catch (err) {
    res.status(STATUS.ERROR.NOT_FOUND).send(err.message);
    }
};

module.exports = {
    getAllTalker,
};