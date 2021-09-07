const express = require('express');

const router = express.Router();
const rescue = require('express-rescue');
const getAllTalkers = require('../utils/readFile');
const writeNewTalker = require('../utils/writeFile');
const { 
    verifiedToken,
    verifiedName, 
    verifiedAge,
    verifiedRate, 
    verifiedDate,
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
    verifiedDate,
    verifiedRate, 
    rescue(async (req, res) => {
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;

    const talkers = await getAllTalkers();
    
    talkers.push({ name, age, id: talkers.length + 1, talk: { watchedAt, rate } });

    console.log(talkers);
    await writeNewTalker(talkers);

    res.status(201).json(talkers);
    console.log(talkers);
}));

/*
router.delete('/:id', verifiedToken, rescue(async (req, res) => {
    const talkers = await getAllTalkers();

    const talkIndex = talkers.findIndex((tal) => tal.id === parseInt(req.params.id, 10));
    
    talkers.splice(talkIndex, 1);

    writeNewTalker(talkers);

    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}));
*/

module.exports = router;