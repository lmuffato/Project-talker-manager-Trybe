const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');
const getAllTalkers = require('../utils/readFile');

router.get('/', rescue(async (req, res) => {
    const talkers = await getAllTalkers();
    res.status(200).json(talkers);
}));

module.exports = router;