const express = require('express');

const router = express.Router();

const util = require('util');

const fs = require('fs');

const { TWO_HUND } = require('./consts');

const readFile = util.promisify(fs.readFile);

router.get('/', async (_req, res) => {
    readFile('./talker.json', 'utf8').then((data) => {
        res.status(TWO_HUND).json(JSON.parse(data));
    });
});

module.exports = router;