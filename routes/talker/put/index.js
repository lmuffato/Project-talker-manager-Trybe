const router = require('express').Router();
const { updateTalker } = require('../../../utils/handleFile');
const { HTTP_OK_STATUS } = require('../../../utils/serverStatus');

router.put('/:id', (req, res) => {
  const { body: talker, params: { id } } = req;

  talker.id = +id;

  updateTalker(talker);

  res.status(HTTP_OK_STATUS).json(talker);
});

module.exports = router;
