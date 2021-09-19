const { TWO_HUND, FOUR_HUND_ONE } = require('./consts');
const talkerService = require('../services/talkerService');


const getAll = async (_req, res) => {
    const talkers = await talkerService.getAll();
    res.status(TWO_HUND).json(talkers);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const talker = await talkerService.getById(id);
    if (talker.message) res.status(FOUR_HUND_ONE).json(talker.message);
    res.status(TWO_HUND).json(talker);
}

module.exports = {
    create,
    getAll,
    getById,
    remove,
};