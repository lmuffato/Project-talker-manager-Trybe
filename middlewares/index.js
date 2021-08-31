// Aqui irão ficar contidas as verificações exigidas nos requisitos

const rescue = require('express-rescue');
const schema = require('../schema');
const { data } = require('../models');

const checkAllTalkers = rescue(async (_req, res, next) => {
  const databaseTalker = await data();
  if (!databaseTalker) {
    res.status(schema.ok).json([]);
  }
  next();
});

module.exports = { checkAllTalkers };
