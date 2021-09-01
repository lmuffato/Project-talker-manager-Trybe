const fs = require('fs').promises;

const createTalker = async (req, res) => {
    const talker = req.body;
    const getTalkers = JSON.parse(await fs.readFile('talker.json', 'utf-8'));
    const id = getTalkers.length + 1;
    talker.id = id;
    getTalkers.push(talker);
    const stringTalker = JSON.stringify(getTalkers); 
    fs.writeFile('./talker.json', stringTalker, 'utf-8');
    
    res.status(201).json(talker);
};

module.exports = createTalker;