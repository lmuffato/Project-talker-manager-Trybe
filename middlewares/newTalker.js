const fs = require('fs').promises;
const { HTTP_CREATE_STATUS, HTTP_BAD_REQUEST } = require('../utils/statusHttp');

const newTalker = async (req, res) => {
  const data = '../talker.json';
  const { name, age, talk } = req.body;

  const arrayTalker = JSON.parse(await fs.readFile(data));

  const addNewTalker = {
    id: arrayTalker.length + 1, name, age, talk,
  };

  arrayTalker.push(addNewTalker);
  await fs.writeFile(data, JSON.stringify(arrayTalker));

  res.status(HTTP_CREATE_STATUS).json(addNewTalker);
};

const nameTalker = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
      return res.status(HTTP_BAD_REQUEST).send({
        message: 'O campo "name" é obrigatório',
      });
    }
    if (name.length < 3) {
      return res.status(HTTP_BAD_REQUEST).send({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
    }
    
    next();
};

const talkerAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(HTTP_BAD_REQUEST).send({
      message: 'O campo "age" é obrigatório',
    });
  } if (age < 18) {
    return res.status(HTTP_BAD_REQUEST).send({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};

module.exports = {
  newTalker,
  nameTalker,
  talkerAge,
};