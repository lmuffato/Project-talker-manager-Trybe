const express = require('express');

const router = express.Router();
const middlewares = require('../middlewares');

router.get('/talker', middlewares.getTalkers);
