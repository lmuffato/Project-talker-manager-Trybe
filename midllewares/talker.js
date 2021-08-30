const fs = require('fs/promises');

const talker = async (_req, res) => {
    const rawData = await fs.readFile('./talker.json', 'utf-8');
     const newArr = await JSON.parse(rawData);     
     return res.status(200).json([...newArr]);  
};

module.exports = talker;
