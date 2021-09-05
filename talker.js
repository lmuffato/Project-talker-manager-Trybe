const express = require('express');
const { readFile } = require('fs').promises;

const router = express.Router();

const getData = async (path) => {
    const data = await readFile(path, 'utf-8');
    return JSON.parse(data);
  };

router.get('/', async (_req, res) => {
    try {
        const talker = await getData('talker.json');
        return res.status(200).json(talker);
    } catch (error) {
        return res.status(200).json([]);
    }
});

module.exports = {
    router,
};