// Aqui ocorre a união dos verbos http + middlewares + camada de services

const rescue = require('express-rescue');
const { data } = require('../models');
const schema = require('../schema');

const getAll = rescue(async (_req, res) => {
  const getAllTalker = await data();
  res.status(schema.ok).json(getAllTalker);
});

module.exports = { getAll };
