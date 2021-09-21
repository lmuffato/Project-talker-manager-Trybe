const fs = require('fs').promises;

const STATUS = require('../status/http_status');

const gen = () => Math.random().toString(36).substr(4);

const convertFromJSON = async () => {
  const rawTalkers = (await fs.readFile('./talker.json')).toString('utf-8');
  const talkers = JSON.parse(rawTalkers);
  return talkers;
};

const getAllTalker = async (_req, res) => {
  const talker = await convertFromJSON();
  res.status(STATUS.SUCCESS.OK).send(talker);
};

const getSortedTalker = async (req, res, next) => {
  try {
  const talkers = await convertFromJSON();
  const { id } = req.params;
  const filterdTalker = talkers.filter((talker) => talker.id === Number(id));
  res.status(STATUS.SUCCESS.OK).send(filterdTalker);
  } catch (err) {
    next(err);
  }
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    res.status(STATUS.ERROR.BAD_REQUEST).send({
      message: 'O campo "email" é obrigatório',
    });
  } else if (!validation.test(email)) {
    res.status(STATUS.ERROR.BAD_REQUEST).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.status(STATUS.ERROR.BAD_REQUEST).send({
      message: 'O campo "password" é obrigatório',
    });
  } else if (password < 6) {
    res.status(STATUS.ERROR.BAD_REQUEST).send({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

const generateToken = (_req, res) => {
  const token = `${gen()}${gen()}`;
  res.status(STATUS.SUCCESS.OK).send({ token });
};

module.exports = {
    getAllTalker,
    getSortedTalker,
    validateEmail,
    validatePassword,
    generateToken,
};