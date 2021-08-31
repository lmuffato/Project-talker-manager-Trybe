// Aqui ocorre a união dos verbos http + middlewares + camada de services

const rescue = require('express-rescue');
const crypto = require('crypto');
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

const loginUser = (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(status.ok).json({ token });
};

module.exports = {
  getAll,
  getById,
  loginUser,
};
