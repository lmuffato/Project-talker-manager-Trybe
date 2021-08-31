const deleteOne = require('../utils/deleteOne');

const SUCCESS = { message: 'Pessoa palestrante deletada com sucesso' };

const deleteTalker = async (req, res) => {
    const { id } = req.params;
    const response = await deleteOne(id);
    if (response) return res.status(200).json(SUCCESS);
};

module.exports = deleteTalker;