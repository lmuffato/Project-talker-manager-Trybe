// Aqui ocorre o processamento da rota + comunicação com a camada de models

const rescue = require('express-rescue');
const crypto = require('crypto');
const { databaseTalker, addEditTalker } = require('../models');
const { status, message } = require('../schema');

const getAll = rescue(async (_req, res) => {
  const getTalkers = await databaseTalker();
  return res.status(status.ok).json(getTalkers);
});

const getById = rescue(async (req, res) => {
  const userId = req.params.id;
  const data = await databaseTalker();
  const findTalker = data.find(({ id }) => id === +userId);
  return res.status(status.ok).json(findTalker);
});

const loginUser = rescue((_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(status.ok).json({ token });
});

const createTalker = rescue(async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await databaseTalker();
  const add = { id: data.length + 1, name, age, talk };
  const dataUsers = [...data, add];
  addEditTalker(dataUsers);
  return res.status(status.created).json(add);
});

const editUser = rescue(async (req, res) => {
  const userId = req.params.id;
  const { name, age, talk } = req.body;
  const data = await databaseTalker();
  const dataForUpdate = { id: +userId, name, age, talk };
  const newDataTalker = data.map(({ id }) => (id === +userId ? dataForUpdate : id));
  addEditTalker(newDataTalker);
  return res.status(status.ok).json(dataForUpdate);
});

const deleteUser = rescue(async (req, res) => {
  const userId = req.params.id;
  const data = await databaseTalker();
  const erase = data.find(({ id }) => id !== +userId);
  addEditTalker(erase);
  return res.status(status.ok).json({ message: message.deleteUser });
});

const searchTalk = rescue(async (req, res) => {
  const queryParam = req.query.q;
  const data = await databaseTalker();
  const search = data.filter((talker) => 
      talker.name.toLowerCase().includes(queryParam.toLowerCase()));
  return res.status(status.ok).json(search);
});

module.exports = {
  getAll,
  getById,
  loginUser,
  createTalker,
  editUser,
  deleteUser,
  searchTalk,
};
