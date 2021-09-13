const router = require('express').Router();
const { readFile, createFile } = require('../../../utils/handleFile');
const { HTTP_CREATED } = require('../../../utils/serverStatus');
const { 
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isTalkDateValid,
  isTalkRateValid,
} = require('../../../utils/validations');

router.use(
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkDateValid,
  isTalkRateValid,
  isTalkValid,
);

router.post('/', (req, res) => {
  const { body: newTalker } = req;
  const data = readFile();
  const newId = data.reduce((lastId, { id }) => {
    if (lastId === id) return lastId + 1;
    return id;
  }, 1);

  newTalker.id = newId;
  data.push(newTalker);

  createFile(data);
  res.status(HTTP_CREATED).json(newTalker);
});

module.exports = router;
