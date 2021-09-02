const express = require('express');
const { dataTalkers } = require('../index');

const talkers = express.Router();

talkers.get('/talker', dataTalkers);

module.exports = talkers;