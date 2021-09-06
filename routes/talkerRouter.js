const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');
const getAllTalkers = require('../utils/readFile');
const writeNewTalker = require('../utils/writeFile');
const { 
    verifiedToken,
    verifiedName, 
    verifiedAge, 
    verifiedTalk } = require('../middlewares/talkerValidation');

router.get('/', rescue(async (req, res) => {
    const talkers = await getAllTalkers();
    res.status(200).json(talkers);
}));

router.get('/:id', rescue(async (req, res) => {
    const talkers = await getAllTalkers();

    const talker = talkers.find((talk) => talk.id === parseInt(req.params.id, 10));

    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    res.status(200).json(talker);
}));

router.post('/', 
    verifiedToken,
    verifiedName,
    verifiedAge, 
    verifiedTalk, 
    rescue(async (req, res) => {
    const { name, age, talk } = req.body;
    // const { watchedAt, rate } = req.body.talk;

    const talkers = await getAllTalkers();
    
    talkers.push({ id: talkers.length + 1, name, age, talk });

    await writeNewTalker(talkers);

    res.status(201).json(talkers);
}));

module.exports = router;