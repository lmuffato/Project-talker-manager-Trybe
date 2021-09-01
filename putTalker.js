const express = require('express');
const fs = require('fs').promises;
const { 
    validateToken, 
    validateName, 
    validateAge, 
    validateTalker, 
    validateTalkAtributs,
} = require('./middlewares');
const fileTalker = require('./fileTalker');

const arrayOfMiddlewares = [
    validateToken, 
    validateName, 
    validateAge, validateTalker, validateTalkAtributs];

const router = express.Router();

router.put('/:id', arrayOfMiddlewares, async (req, res) => {
   const { id } = req.params;
   const { name, age, talk } = req.body;
   const file = await fileTalker();
   const findById = file.findIndex((elem) => elem.id === Number(id));
   file[findById] = { ...file[findById], name, age, talk };
   await fs.writeFile('talker.json', JSON.stringify(file));
  res.status(200).json(file[findById]);
});

module.exports = router;