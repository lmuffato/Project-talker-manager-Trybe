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

router.get('/', getAllTalker);

router.get('/search', validateToken, TalkerBySearchTerm);

router.get('/:id', getSortedTalker);

router.post('/login', validateEmail, validatePassword, generateToken);

router.post('/', validateToken, validateFields, validateData, validateTalk, pushNewTalker);

router.put('/:id', validateToken, validateFields, validateData, validateTalk, editTalker);

router.delete('/:id', validateToken, removeTalker);

module.exports = router;