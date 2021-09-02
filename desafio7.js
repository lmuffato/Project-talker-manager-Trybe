const fs = require('fs').promises;

const searchTalker = async (req, res) => {
    const { q } = req.query;
    
    console.log('q', q);

    const talkers = await fs.readFile('./talker.json', 'utf-8');
    const talkersInJSON = JSON.parse(talkers);
    
    const result = talkersInJSON.filter((t) => t.name.includes(q));
    
    res.status(200).send(result);
};

module.exports = searchTalker;