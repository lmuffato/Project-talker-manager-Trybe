const router = require('express').Router();
const readFile = require('../../utils/readFile');
const { HTTP_OK_STATUS, HTTP_ERROR_STATUS } = require('../../utils/serverStatus');

const data = readFile();

router.get('/', (_req, res) => {
  try {
    if (!data) return res.status(HTTP_OK_STATUS).send([]);
    res.status(HTTP_OK_STATUS).json(data);
  } catch (error) {
    console.error(error);
    res.status(HTTP_ERROR_STATUS).json({ message: 'Erro ao ler arquivo' });
  }
});

module.exports = router;
