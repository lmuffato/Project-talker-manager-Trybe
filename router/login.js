const { Router } = require('express');
const { gerarToken, validarEmail, validarPassword } = require('../middlewares');

const HTTP_OK_STATUS = 200;

const router = Router();

router.post('/', validarPassword, validarEmail, (_req, res) => res.status(HTTP_OK_STATUS)
  .json({ token: gerarToken() }));

module.exports = router;