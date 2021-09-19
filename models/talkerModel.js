const getStuff = require('./getStuff');

const getAll = async () => {
       getStuff.then((data) => {
           return JSON.parse(data)
       });
};

const getById = async (id) => {
    getStuff.then((data) => {
        const jsonData = JSON.parse(data);
        const talker = jsonData.find((t) => t.id === parseInt(id, 10));
        return talker
    });
};

module.exports = {
    create,
    getAll,
    getById,
    remove,
};