const HTTP_OK_STATUS = 200;
const fs = require('fs');
const talkersList = require('../talker.json');

const TALKERFILE = '../talker.json';

async function fullQuery(_req, res) {
res.status(HTTP_OK_STATUS).json(talkersList);  
}

async function querySearch(_req, res) {
  fs.readFile(TALKERFILE, (error, data) => {
    if (error) {
      return res.status(HTTP_OK_STATUS).json([]);
    }
    const talker = JSON.parse(data);
  return res.status(HTTP_OK_STATUS).json(talker);
  });
}

async function queryPush(req, res) {
  const { id, name, age, talk } = req.body;
  talkersList.push({ id, name, age, talk });
  res.status(HTTP_OK_STATUS).json(req.body);
}

async function loginValidation(req, res) {
 res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
}

module.exports = {
  querySearch,
  fullQuery,
  queryPush,
  loginValidation,
};