const express = require('express');
const { getAllTalker,
    getSortedTalker,
    TalkerBySearchTerm,
    generateToken,
    pushNewTalker,
    editTalker,
    removeTalker,
} = require('../middlewares/talker');

const { validateEmail,
    validatePassword,
    validateFields,
    validateData,
    validateToken,
    validateTalk,
} = require('../middlewares/validations');

const router = express.Router();

router.get('/talker', getAllTalker);

router.get('/talker/search', validateToken, TalkerBySearchTerm);

router.get('/talker/:id', getSortedTalker);

router.post('/login', validateEmail, validatePassword, generateToken);

router.post('/talker', validateToken, validateFields, validateData, validateTalk, pushNewTalker);

router.put('/talker/:id', validateToken, validateFields, validateData, validateTalk, editTalker);

router.delete('/talker/:id', validateToken, removeTalker);

module.exports = router;