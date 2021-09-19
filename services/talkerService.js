const talkerModel = require('../models/talkerModel');

const getAll = async () => {
    const talker = await talkerModel.getAll();
    return talker;
};

const getById = async (id) => {
    const talker = await talkerModel.getById(id);
    if (!talker) return { message: 'Pessoa palestrante não encontrada' };
    return talker;
}

module.exports = {
    create,
    getAll,
    getById,
    remove,
};