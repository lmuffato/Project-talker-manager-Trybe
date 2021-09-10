const express = require('express');

const router = express.Router();

const getTalkersId = require('./getTalkersId');
const getTalkers = require('./getTalkers');

router.get('/', getTalkers, getTalkersId);

module.exports = {
  getTalkersId,
  getTalkers,
};