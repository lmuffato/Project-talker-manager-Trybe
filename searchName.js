const fs = require('fs');

const searchName = async (req, res) => {
    const { query } = req.query;
    const json = JSON.parse(await fs.promises.readFile('./talker.json'));

    const findTalkers = json.filter((element) => element.name.includes(query));

    if (query) {
        return res.status(200).json(findTalkers);
    } return res.status(200).json(json);
};

module.exports = searchName;
