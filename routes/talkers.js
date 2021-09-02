const express = require('express');
const { dataTalkers } = require('../Middlewares/dataTalkers');

const talkers = express.Router();

talkers.get('/talker', dataTalkers);

module.exports = talkers;