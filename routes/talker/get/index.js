const router = require('express').Router();
const readFile = require('../../../utils/readFile');
const { 
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND,
 } = require('../../../utils/serverStatus');

router.get('/', (_req, res, next) => {
  try {
    const data = readFile();

    if (!data) return res.status(HTTP_OK_STATUS).json([]);

    res.status(HTTP_OK_STATUS).json(data);
  } catch (err) {   
    next(err);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const data = readFile();
    const talker = data.find((dataTalker) => parseInt(id, 10) === dataTalker.id);

    if (!talker) {
      return res.status(HTTP_NOT_FOUND).json({ 
        message: 'Pessoa palestrante não encontrada',
      });
    }

    res.status(HTTP_OK_STATUS).json(talker);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
