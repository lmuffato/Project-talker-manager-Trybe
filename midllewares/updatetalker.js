const updateOne = require('../utils/updateOne');

const updatedTalker = async (req, res) => {
    const { id } = req.params;
    const { name, talk, age } = req.body;
    const response = await updateOne({ name, age, talk }, id);    
    if (!response) return res.status(400).send('sorry');
    return res.status(200).json(response);
};

module.exports = updatedTalker;