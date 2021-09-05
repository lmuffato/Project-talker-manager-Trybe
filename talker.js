const express = require('express');
const { readFile } = require('fs').promises;

const router = express.Router();

// const getData = async (path) => {
//     const data = await readFile(path, 'utf-8');
//     return JSON.parse(data);
//   };

router.get('/', async (_req, res) => {
    try {
        const data = await readFile('./talker.json', 'utf-8');
        // console.log(JSON.parse(data));
        return res.status(200).json(JSON.parse(data));
    } catch (error) {
        return res.status(200).json([]);
    }
});

module.exports = router;