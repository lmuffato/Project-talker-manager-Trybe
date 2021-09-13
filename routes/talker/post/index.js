const router = require('express').Router();
const { addTalker } = require('../../../utils/handleFile');
const { HTTP_CREATED } = require('../../../utils/serverStatus');

router.post('/', (req, res) => {
  const { body: newTalker } = req;

  const newId = addTalker(newTalker);

  newTalker.id = newId;

  res.status(HTTP_CREATED).json(newTalker);
});

module.exports = router;
