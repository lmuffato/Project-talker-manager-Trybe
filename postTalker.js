const express = require('express');
const fs = require('fs').promises;
const { 
    validateToken, 
    validateName, 
    validateAge, 
    validateTalker, 
    validateTalkAtributs } = require('./middlewares');
const fileTalker = require('./fileTalker');

const router = express.Router();

router.post('/', validateToken, 
validateName, validateAge, validateTalker, validateTalkAtributs, async (req, res) => {
    const { name, age, talk } = req.body;
    const file = await fileTalker();
    const id = file.length + 1;
    file.push({ id, name, age, talk });
   await fs.writeFile('talker.json', JSON.stringify(file));
  res.status(201).json({ id, name, age, talk });
});

module.exports = router;