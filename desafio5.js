const fs = require('fs').promises;

const updateTalker = async (req, res) => {
    const talkerFromBody = req.body;
    const { id } = req.params;

    const allTalkers = await fs.readFile('./talker.json', 'utf-8');
    const parsed = JSON.parse(allTalkers);
    
    const founded = parsed.find((t) => t.id === +id);
    const indexOfFounded = parsed.indexOf(founded);
    parsed.splice(indexOfFounded, 1, talkerFromBody);
    
    try {
        await fs.writeFile('./talker.json', JSON.stringify(parsed), 'utf-8');
        res.status(200).json(parsed[indexOfFounded]);
    } catch (e) {
        console.error(e.message);
    }
};

module.exports = updateTalker;