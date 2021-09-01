// Aqui ocorre a união dos verbos http + middlewares + camada de services

const rescue = require('express-rescue');
const crypto = require('crypto');
const { data, addTalker } = require('../models');
const { status } = require('../schema');

const getAll = rescue(async (_req, res) => {
  const getTalkers = await data();
  res.status(status.ok).json(getTalkers);
});

const getById = rescue(async (req, res) => {
  const getParams = req.params.id;
  const dataTalker = await data();
  const findTalker = dataTalker.find(({ id }) => id === +getParams);
  res.status(status.ok).json(findTalker);
});

const loginUser = rescue((_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(status.ok).json({ token });
});

const createTalker = rescue(async (req, res) => {
  const { name, age, talk } = req.body;
  const dataTalker = await data();
  const add = { id: dataTalker.length + 1, name, age, talk };
  const dataUsers = [...dataTalker, add];
  addTalker(dataUsers);
  res.status(status.created).json(add);
});

module.exports = {
  getAll,
  getById,
  loginUser,
  createTalker,
};
