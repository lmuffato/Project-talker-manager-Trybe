// Aqui ocorre a união dos verbos http + middlewares + camada de services

const rescue = require('express-rescue');
const { data } = require('../models');
const { status } = require('../schema');

const getAll = rescue(async (_req, res) => {
  const getTalkers = await data();
  res.status(status.ok).json(getTalkers);
});

const getById = async (req, res) => {
  const getParams = req.params.id;
  const dataTalker = await data();
  const findTalker = dataTalker.find(({ id }) => id === +getParams);
  res.status(status.ok).json(findTalker);
};

module.exports = {
  getAll,
  getById,
};
