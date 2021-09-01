// Aqui ocorre a união dos verbos http + middlewares + camada de services

const rescue = require('express-rescue');
const crypto = require('crypto');
const { data, addEditTalker } = require('../models');
const { status } = require('../schema');

const getAll = rescue(async (_req, res) => {
  const getTalkers = await data();
  return res.status(status.ok).json(getTalkers);
});

const getById = rescue(async (req, res) => {
  const userId = req.params.id;
  const dataTalker = await data();
  const findTalker = dataTalker.find(({ id }) => id === +userId);
  return res.status(status.ok).json(findTalker);
});

const loginUser = rescue((_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(status.ok).json({ token });
});

const createTalker = rescue(async (req, res) => {
  const { name, age, talk } = req.body;
  const dataTalker = await data();
  console.log(dataTalker);
  const add = { id: dataTalker.length + 1, name, age, talk };
  const dataUsers = [...dataTalker, add];
  addEditTalker(dataUsers);
  return res.status(status.created).json(add);
});

const editUser = rescue(async (req, res) => {
  const userId = req.params.id;
  const { name, age, talk } = req.body;
  const dataTalker = await data();
  console.log(dataTalker);
  const dataForUpdate = { id: +userId, name, age, talk };
  console.log();
  const newDataTalker = dataTalker.map(({ id }) => (id === +userId ? dataForUpdate : id));
  console.log();
  addEditTalker(newDataTalker);
  console.log();
  res.status(status.ok).json(dataForUpdate);
});

module.exports = {
  getAll,
  getById,
  loginUser,
  createTalker,
  editUser,
};
