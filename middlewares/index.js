// Aqui irão ficar contidas as verificações exigidas nos requisitos

const rescue = require('express-rescue');
const { status, message } = require('../schema');
const { data } = require('../models');

const checkAll = rescue(async (_req, res, next) => {
  const databaseTalker = await data();
  if (!databaseTalker) res.status(status.ok).json([]);
  next();
});

const getById = rescue(async (req, res, next) => {
  const idParams = req.params.id;
  const databaseTalker = await data();
  const findTalker = databaseTalker.find(({ id }) => id === +idParams);
  if (!findTalker) res.status(status.notFound).json({ message: message.notFound });
  next();
});

module.exports = {
  checkAll,
  getById,
};
