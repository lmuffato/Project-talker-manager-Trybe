const express = require('express');

const router = express.Router();

const util = require('util');

const fs = require('fs');

const { TWO_HUND, TALKER, UTF, FOUR_OH_FOUR } = require('./consts');

const readFile = util.promisify(fs.readFile);

router.get('/', async (_req, res) => {
    readFile(TALKER, UTF).then((data) => {
        res.status(TWO_HUND).json(JSON.parse(data));
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    readFile(TALKER, UTF).then((data) => {
        const jsonData = JSON.parse(data);
        const talker = jsonData.find((t) => t.id === parseInt(id, 10));
        if (talker) {
            res.status(TWO_HUND).send(talker); 
          } else {
            res.status(FOUR_OH_FOUR).json({ message: 'Pessoa palestrante não encontrada' });
          }
    });
});

module.exports = router;