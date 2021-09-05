const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const data = await fs.readFile('./talker.json', 'utf-8');
        // console.log(JSON.parse(data));
        return res.status(200).json(JSON.parse(data));
    } catch (error) {
        return res.status(200).json([]);
    }
});

module.exports = router;